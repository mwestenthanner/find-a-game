export function randomizeTagColor(name: string): string {

    const firstChar = name.charAt(0).toLowerCase();
    const asciiCode = firstChar.charCodeAt(0);

    let color;

    switch (true) {
      case (asciiCode < 103):
        color = 'pink';
        break;
      case (103 <= asciiCode && asciiCode < 109):
        color = 'orange';
        break;
      case (109 <= asciiCode && asciiCode < 115):
        color = 'purple';
        break;
      default:
        color = 'red';
    }

    return color;

  }