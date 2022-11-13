import { FC, ReactNode, useState, useCallback, useEffect } from 'react'
import useCarousel, { EmblaOptionsType } from 'embla-carousel-react'
import "./embla.css";
import PrevButton from './PrevButton';
import NextButton from './NextButton';

interface Props {
  options?: EmblaOptionsType
  slides: ReactNode[]
}

const Carousel: FC<Props> = ({options, slides}) => {

  const [viewportRef, embla] = useCarousel({
    slidesToScroll: options?.slidesToScroll, 
    skipSnaps: false,
    draggable: false,
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);


  const onSelect = useCallback(() => {
    if (embla) {
      setPrevBtnEnabled(embla.canScrollPrev());
      setNextBtnEnabled(embla.canScrollNext());
    }
  }, [embla]);


  useEffect(() => {
    if (embla) {
      embla.on("select", onSelect);
      onSelect();
      embla.reInit();
    }
  }, [embla, onSelect, slides]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={viewportRef}>
        <div className="embla__container">
          {slides.map((article, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__inner">
                <div className="embla__slide__item">
                  {article}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
      <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
    </div>
  );
};

export default Carousel;