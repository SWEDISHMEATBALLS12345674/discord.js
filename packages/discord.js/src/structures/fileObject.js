/**
* Simple structure for file uploads
*/
class fileObject {
  /**
  *@param {string} name The name the file should show up as
  *@param {string} contents What the file contents should be (might add a way to straight up give this a buffer)
  *@param {string} type The filetype (as a mime type) defaults to text/plain and discord prob checks extensions anyways
  */
  constructor(name, contents, type="text/plain") {
    this.name = name;
    this.contents = contents;
    this.type = type;
  }
}
