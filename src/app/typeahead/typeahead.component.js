"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var TypeaheadComponent = (function () {
    function TypeaheadComponent(el) {
        /** Eventos do AJAX do Typeahead. */
        this.sent = new core_1.EventEmitter();
        this.received = new core_1.EventEmitter();
        this.selected = new core_1.EventEmitter();
        this.element = el.nativeElement;
    }
    /** Ao inicializar, recuperar inputText, configurar mask plugin e typeahead. */
    TypeaheadComponent.prototype.ngOnInit = function () {
        this.getInputText();
        this.configureMask();
        this.configureTypeahead();
    };
    /** Método para recuperar o inputText que irá ter a máscara e typeahead. */
    TypeaheadComponent.prototype.getInputText = function () {
        this.inputText = this.element.children[0];
    };
    /** Método para configurar máscara no inputText. */
    TypeaheadComponent.prototype.configureMask = function () {
        if (!this.mask)
            return;
        var maskOptions = "";
        if (this.maskOptions)
            maskOptions = JSON.parse(this.maskOptions);
        $(this.inputText).mask(this.mask, maskOptions);
    };
    /** Método para configurar o typeahead no inputText. */
    TypeaheadComponent.prototype.configureTypeahead = function () {
        var _this = this;
        var scope = this;
        var options = {
            /** Evento invocado durante seleção de um item. */
            updater: function (selectedItem) {
                // Propriedade definida como display do item selecionado.
                var item = selectedItem[scope.displayField];
                // Recortar.
                if (scope.regex) {
                    item = item.match('^[a-zA-Z]{3}-[0-9]{4}')[0];
                }
                else if (scope.subStart != undefined && scope.subEnd != undefined) {
                    item = item.substr(scope.subStart, scope.subEnd);
                }
                // Emitir seleção.
                if (scope.selected)
                    scope.selected.emit(selectedItem);
                return item;
            },
            ajax: {
                url: this.url,
                displayField: this.displayField,
                triggerLength: this.triggerLength,
                method: this.method,
                /** Evento invocado antes de invocar o serviço. */
                preDispatch: function (query) {
                    if (_this.sent)
                        _this.sent.emit(query);
                    return _this.queryString + "=" + query;
                },
                /** Evento invocado após retorno de dados do serviço. */
                preProcess: function (data) {
                    if (_this.received)
                        _this.received.emit(data);
                    return data;
                }
            }
        };
        $(this.inputText).typeahead(options);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TypeaheadComponent.prototype, "sent", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TypeaheadComponent.prototype, "received", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TypeaheadComponent.prototype, "selected", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TypeaheadComponent.prototype, "url", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TypeaheadComponent.prototype, "queryString", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TypeaheadComponent.prototype, "displayField", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TypeaheadComponent.prototype, "triggerLength", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TypeaheadComponent.prototype, "method", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TypeaheadComponent.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', common_1.NgClass)
    ], TypeaheadComponent.prototype, "class", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', common_1.NgStyle)
    ], TypeaheadComponent.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TypeaheadComponent.prototype, "mask", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TypeaheadComponent.prototype, "maskOptions", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TypeaheadComponent.prototype, "regex", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TypeaheadComponent.prototype, "subStart", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TypeaheadComponent.prototype, "subEnd", void 0);
    TypeaheadComponent = __decorate([
        core_1.Component({
            selector: 'typeahead',
            templateUrl: './app/typeahead/typeahead.template.html'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], TypeaheadComponent);
    return TypeaheadComponent;
}());
exports.TypeaheadComponent = TypeaheadComponent;
//# sourceMappingURL=typeahead.component.js.map