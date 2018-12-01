export default class Catcher {
  /**
   * --------------------------------------------------
   * global console to display the debug messages.
   * --------------------------------------------------
   * @param {String} fromWhere define the method, line
   * number or identifier.
   * @param {String} log message to print.
   * --------------------------------------------------
   */
  static console(fromWhere, log) {
    // eslint-disable-next-line
    console.log(fromWhere, ' -> ', log);
  }
}
