export function timeSince(date: string): string {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + ' years ago';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' months ago';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' days ago';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' hours ago';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' minutes ago';
  }
  return Math.floor(seconds) + ' seconds ago';
}

export function truncateWords(str: string, noWords: number): string {
  if (typeof str !== 'string') {
    console.error('truncateWords function received a non-string argument:', str);
    return '';
  }
  if (!str) return '';
  const wordsArray = str.split(' ');
  if (wordsArray.length <= noWords) return str;
  return wordsArray.splice(0, noWords).join(' ') + '...';
}

export function removeHtmlTags(html?: string): string {
  if (!html) return '';
  const div = document.createElement('div');
  div.innerHTML = html;
  const plainString = div.textContent || div.innerText;
  return plainString;
}

export function formatTime(milliseconds: number) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}
