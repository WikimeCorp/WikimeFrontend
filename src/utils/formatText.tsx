export function formatText(text: string): JSX.Element[] {
    const newText = text.split('\n').map((str) => <p>{str}</p>);

    return newText;
}
