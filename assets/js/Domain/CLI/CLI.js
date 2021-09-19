/**
 * CLI Data Model
 */
 class CliData
 {
 
     /**
      * The Constructor
      * 
      * @param {element} outputElement The CLI Output DOM Element
      * @param {element} inputElement  The CLI Input DOM Element 
      */
     constructor(outputElement, inputElement)
     {
         this.outputElement = outputElement;
         this.inputElement  = inputElement;
         this.lastInput     = NULL;
     }
}

/**
 * CLI Service
 */
class CLI extends CliData
{
    readInput(input)
    {
        this.lastInput = input;
        return input;       
    }

    getLastInput()
    {
        return this.lastInput;
    }

    output(output)
    {
        this.cliElement.before(output + "<br>");
    }
}