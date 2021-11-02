export class Tools {
  static TrimNumber(n: number): number {
    if (n < 0) {
      return 0;
    } else if (n > 100) {
      return 100;
    } else {
      return n;
    }
  }
}
