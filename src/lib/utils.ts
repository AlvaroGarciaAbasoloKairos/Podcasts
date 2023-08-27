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
    if (!str) return "";
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
  