export default class tagmarItemSheet extends ItemSheet {
    constructor(...args) {
        super(...args);
        // Expand the default size of the class sheet
        if ( this.item.data.type === "Combate" ) {
          this.options.width = this.position.width =  640;
          this.options.height = this.position.height = 660;
        }
        if ( this.item.data.type === "Raca" ) {
            this.options.width = this.position.width =  640;
            this.options.height = this.position.height = 450;
        }
      }
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
        classes: ["tagmar", "sheet", "item"],
        //width: 900,
        //height: 600,
        tabs: [{
            navSelector: ".prim-tabs",
            contentSelector: ".sheet-primary",
            initial: "descricao"
            }]
        });
    }

    get template() {
        return 'systems/tagmar/templates/sheets/'+ this.item.data.type.toLowerCase() +'-sheet.hbs';
    }

    getData() {
        const data = super.getData();
        if (this.item.data.type == "Profissao" && this.item.data.data.especializacoes != "") {
            data.item.especializacoes = this.item.data.data.especializacoes.split(",");
        } else if (this.item.data.type == "Profissao") data.item.especializacoes = [];
        return data;
    }

    activateListeners(html) {
        super.activateListeners(html);
        if (!this.options.editable) return;

        html.find(".dano25").change(event => {
            const dano25Input = html.find(".dano25");
            var dano25 = parseInt($(dano25Input).val());
            var dano50 = dano25 + dano25;
            var dano75 = dano50 + dano25;
            var dano100 = dano75 + dano25;
            var dano125 = dano100 + dano25;
            var dano150 = dano125 + dano25;
            var dano175 = dano150 + dano25;
            var dano200 = dano175 + dano25;
            var dano225 = dano200 + dano25;
            var dano250 = dano225 + dano25;
            var dano275 = dano250 + dano25;
            var dano300 = dano275 + dano25;
            $(html.find(".dano50")).val(dano50);
            $(html.find(".dano75")).val(dano75);
            $(html.find(".dano100")).val(dano100);
            $(html.find(".dano125")).val(dano125);
            $(html.find(".dano150")).val(dano150);
            $(html.find(".dano175")).val(dano175);
            $(html.find(".dano200")).val(dano200);
            $(html.find(".dano225")).val(dano225);
            $(html.find(".dano250")).val(dano250);
            $(html.find(".dano275")).val(dano275);
            $(html.find(".dano300")).val(dano300);
        });
        html.find(".sendMessage").click(this._sendMessage.bind(this));

        html.find(".ajuste").change(this._attTotalHab(this));
        html.find(".nivel").change(this._attTotalHab(this));
        html.find(".penal").change(this._attTotalHab(this));
        html.find(".bonus").change(this._attTotalHab(this));
        html.find(".bAddEspec").click(this._addEspec.bind(this));
        html.find(".bApagaEspec").click(this._deleteEspec.bind(this));
    }

    _sendMessage(event) {
        if (this.item.isOwned) {
            let itemActor = this.item.actor.getOwnedItem(this.item._id);
            Item.create(itemActor).then(function(value){
                let chatData = {};
                chatData.content = '@Item['+value._id+']';
                ChatMessage.create(chatData);
            });
        } else {
            let chatData = {};
            chatData.content = '@Item['+this.item._id+']';
            ChatMessage.create(chatData);
        }
    }

    _deleteEspec(event) {
        const itemData = this.item.data.data;
        let especD = $(event.currentTarget).data("itemId");
        let espec_list_string = itemData.especializacoes;
        let nova_string = "";
        let espec_list = espec_list_string.split(",");
        for (let i = 0; i < espec_list.length; i++) {
            if (espec_list[i] == especD) {
                espec_list.splice(i, 1);
            }
        }
        nova_string = espec_list.join(",");
        this.item.update({
            "data.especializacoes": nova_string
        });
        this.render();
    }

    _addEspec(event) {
        const item = this.item;
        const espec_name = $(".iEspecName").val();
        let espec_list = item.data.data.especializacoes;
        let espec_list_string = "";
        
        if (!espec_list.search(",") && espec_name != "") {
            espec_list_string = espec_name + ",";
        } else if (espec_name != "") {
            espec_list_string = espec_list + espec_name + ",";
        }
        if (espec_list_string != "") {
            this.item.update({
                "data.especializacoes": espec_list_string
            });
        }
        this.render();
    }
    

    _attTotalHab(event) {
        const ajuste = $(".ajuste").val();
        const nivel = $(".nivel").val();
        const penal = $(".penal").val();
        const bonus = $(".bonus").val();
        let soma = parseInt(ajuste) + parseInt(nivel) + parseInt(penal) + parseInt(bonus);
        $(".totalInput2").val(soma);
    }

}