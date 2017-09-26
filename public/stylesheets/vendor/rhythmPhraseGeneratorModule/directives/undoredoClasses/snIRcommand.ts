module SnRSPhraseGenerator {
    export interface ICommand {
        name(): string;
        execute(argElement: HTMLElement );
        unExecute(argElement: HTMLElement);
    }
}