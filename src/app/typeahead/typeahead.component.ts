import { Component, ElementRef, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NgStyle, NgClass } from '@angular/common';
declare var $:any;

@Component({
    selector: 'typeahead',
    templateUrl: './app/typeahead/typeahead.template.html'
})
export class TypeaheadComponent {
    /** Eventos do AJAX do Typeahead. */
    @Output() sent = new EventEmitter<string>();
    @Output() received = new EventEmitter<any>();
    @Output() selected = new EventEmitter<string>();

    /** Variaveis de configuração do Typeahead. */
    @Input() url: string;
    @Input() queryString: string;
    @Input() displayField: string;
    @Input() triggerLength: number;
    @Input() method: string;

    /** Placeholder e Style do InputText. */
    @Input() placeholder: string;
    @Input() class: NgClass;
    @Input() style: NgStyle;

    /** Váriaveis de Configuração de Mask Plugin do InputText. */
    @Input() mask: string;
    @Input() maskOptions: string;

    /** Regex e Substring para seleção do item. */
    @Input() regex: string;
    @Input() subStart: number;
    @Input() subEnd: number;

    /** Referências para o elemento que contem o typeahead e inputText. */
    private element: HTMLElement;
    private inputText: HTMLInputElement;

    constructor(el: ElementRef) {
        this.element = el.nativeElement as HTMLElement;
    }

    /** Ao inicializar, recuperar inputText, configurar mask plugin e typeahead. */
    ngOnInit() {
        this.getInputText();
        this.configureMask();
        this.configureTypeahead();
    }

    /** Método para recuperar o inputText que irá ter a máscara e typeahead. */
    getInputText() {
        this.inputText = this.element.children[0] as HTMLInputElement;
    }

    /** Método para configurar máscara no inputText. */
    configureMask() {
        if (!this.mask) return;
        let maskOptions = "";
        if (this.maskOptions) maskOptions = JSON.parse(this.maskOptions);
        $(this.inputText).mask(this.mask, maskOptions);
    }

    /** Método para configurar o typeahead no inputText. */
    configureTypeahead() {
        let scope = this;
        let options = {
            /** Evento invocado durante seleção de um item. */
            updater: (selectedItem: any) => {
                
                // Propriedade definida como display do item selecionado.
                let item = selectedItem[scope.displayField];

                // Recortar.
                if (scope.regex) {
                    item = item.match('^[a-zA-Z]{3}-[0-9]{4}')[0];
                } else if (scope.subStart != undefined && scope.subEnd != undefined) {
                    item = item.substr(scope.subStart, scope.subEnd);
                }

                // Emitir seleção.
                if (scope.selected) scope.selected.emit(selectedItem);
                return item;
            },
            ajax: {
                url: this.url,
                displayField: this.displayField,
                triggerLength: this.triggerLength,
                method: this.method,
                /** Evento invocado antes de invocar o serviço. */
                preDispatch: (query: string) => {
                    if (this.sent) this.sent.emit(query);
                    return this.queryString + "=" + query;
                },
                /** Evento invocado após retorno de dados do serviço. */
                preProcess: (data: any) => {
                    if (this.received) this.received.emit(data);
                    return data;
                }
            }
        };

        $(this.inputText).typeahead(options);
    }
}