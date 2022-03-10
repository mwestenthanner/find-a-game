export function randomizeTagColor(): string {

    const tagColors = ['purple', 'pink', 'yellow', 'orange'];
    return tagColors[Math.floor(Math.random() * tagColors.length)];

  }