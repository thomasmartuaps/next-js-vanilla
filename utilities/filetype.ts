export default (type: string) => {
  switch (type) {
    case 'image/jpeg':
      return 'jpeg';

    case 'image/jpg':
      return 'jpg';

    case 'image/png':
      return 'png';

    case 'image/gif':
      return 'gif';

    case 'image/bmp':
      return 'bmp';

    default:
      return 'unknown';
  }
};
