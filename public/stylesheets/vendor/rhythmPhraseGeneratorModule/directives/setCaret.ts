class irsetCaretDirective implements ng.IDirective {
    public scope = {};
    //static $inject = ["$timeout"];
    constructor() {
        this.scope = { caret: '@caret' };
    }
    public link($scope: directiveScope, element: JQuery, attributes: ng.IAttributes) {
        var self = this;
        $scope.$watch('caret', function (value) {
            var caretPos = Number(value);
            if (caretPos == 0)
                return;
            var elem: any = element[0];
            if (elem !== null) {
                if (elem.createTextRange) {
                    var range = elem.createTextRange();
                    range.move('character', caretPos);
                    range.select();
                } else {
                    if (elem.setSelectionRange) {
                        elem.focus();
                        elem.setSelectionRange(caretPos, caretPos);
                    } else
                        elem.focus();
                }
            }
            // self.setCaretPosition(element[0], caret);
        });
    }

    setCaretPosition(elem, caretPos) {
        if (elem !== null) {
            if (elem.createTextRange) {
                var range = elem.createTextRange();
                range.move('character', caretPos);
                range.select();
            } else {
                if (elem.setSelectionRange) {
                    elem.focus();
                    elem.setSelectionRange(caretPos, caretPos);
                } else
                    elem.focus();
            }
        }
    }

}
export interface directiveScope extends ng.IScope {
    caret: number;
}

angular.module("InstaRhythmApp").directive('caret', [() => new irsetCaretDirective()]);