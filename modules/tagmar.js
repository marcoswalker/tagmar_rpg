import tagmarItemSheet from "./sheets/tagmarItemSheet.js";
import tagmarActorSheet from "./sheets/tagmarActorSheet.js";
import tagmarAltSheet from "./sheets/tagmarAltSheet.js";
import { tagmarItem } from "./tagmarItem.js";
import {tagmarActor} from "./tagmarActor.js";
import { preloadHandlebarsTemplates } from "./templates.js";
import { SystemSettings } from "./settings.js";

let ocultos = false;

const tabela_resol = [
  [-7, "verde", "verde", "verde", "verde", "verde", "verde", "branco", "branco", "branco", "branco", "branco", "branco", "branco", "branco", "amarelo", "amarelo", "laranja", "vermelho", "azul", "cinza"],
  [-6, "verde", "verde", "verde", "verde", "verde", "branco", "branco", "branco", "branco", "branco", "branco", "branco", "branco", "amarelo", "amarelo", "amarelo", "laranja", "vermelho", "azul", "cinza"],
  [-5, "verde", "verde", "verde", "verde", "branco", "branco", "branco", "branco", "branco", "branco", "branco", "branco", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "vermelho", "azul", "cinza"],
  [-4, "verde", "verde", "verde", "branco", "branco", "branco", "branco", "branco", "branco", "branco", "branco", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "vermelho", "azul", "cinza"],
  [-3, "verde", "verde", "verde", "branco", "branco", "branco", "branco", "branco", "branco", "branco", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "laranja", "vermelho", "azul", "cinza"],
  [-2, "verde", "verde", "verde", "branco", "branco", "branco", "branco", "branco", "branco", "branco", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "vermelho", "vermelho", "azul", "cinza"],
  [-1, "verde", "verde", "branco", "branco", "branco", "branco", "branco", "branco", "branco", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "laranja", "vermelho", "vermelho", "azul", "cinza"],
  [0, "verde", "verde", "branco", "branco", "branco", "branco", "branco", "branco", "branco", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "vermelho", "vermelho", "vermelho", "azul", "cinza"],
  [1, "verde", "branco", "branco", "branco", "branco", "branco", "branco", "branco", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "laranja", "vermelho", "vermelho", "vermelho", "azul", "cinza"],
  [2, "verde", "branco", "branco", "branco", "branco", "branco", "branco", "branco", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "laranja", "vermelho", "vermelho", "azul", "azul", "cinza"],
  [3, "verde", "branco", "branco", "branco", "branco", "branco", "branco", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "laranja", "vermelho", "vermelho", "vermelho", "azul", "azul", "cinza"],
  [4, "verde", "branco", "branco", "branco", "branco", "branco", "branco", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "laranja", "vermelho", "vermelho", "vermelho", "azul", "azul", "cinza"],
  [5, "verde", "branco", "branco", "branco", "branco", "branco", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "laranja", "laranja", "vermelho", "vermelho", "vermelho", "azul", "azul", "cinza"],
  [6, "verde", "branco", "branco", "branco", "branco", "branco", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "laranja", "vermelho", "vermelho", "vermelho", "azul", "azul", "azul", "cinza"],
  [7, "verde", "branco", "branco", "branco", "branco", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "laranja", "laranja", "vermelho", "vermelho", "vermelho", "azul", "azul", "azul", "cinza"],
  [8, "verde", "branco", "branco", "branco", "branco", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "laranja", "laranja", "vermelho", "vermelho", "vermelho", "azul", "azul", "azul", "cinza"],
  [9, "verde", "branco", "branco", "branco", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "laranja", "laranja", "vermelho", "vermelho", "vermelho", "vermelho", "azul", "azul", "azul", "cinza"],
  [10, "verde", "branco", "branco", "branco", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "laranja", "laranja", "vermelho", "vermelho", "vermelho", "azul", "azul", "azul", "azul", "cinza"],
  [11, "verde", "branco", "branco", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "laranja", "laranja", "laranja", "vermelho", "vermelho", "vermelho", "azul", "azul", "azul", "roxo", "cinza"],
  [12, "verde", "branco", "branco", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "laranja", "laranja", "vermelho", "vermelho", "vermelho", "vermelho", "azul", "azul", "azul", "roxo", "cinza"],
  [13, "verde", "branco", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "laranja", "laranja", "laranja", "vermelho", "vermelho", "vermelho", "vermelho", "azul", "azul", "azul", "roxo", "cinza"],
  [14, "verde", "branco", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "laranja", "laranja", "laranja", "vermelho", "vermelho", "vermelho", "azul", "azul", "azul", "azul", "roxo", "cinza"],
  [15, "verde", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "laranja", "laranja", "laranja", "vermelho", "vermelho", "vermelho", "vermelho", "azul", "azul", "azul", "roxo", "roxo", "cinza"],
  [16, "verde", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "laranja", "laranja", "laranja", "vermelho", "vermelho", "vermelho", "vermelho", "azul", "azul", "azul", "roxo", "roxo", "cinza"],
  [17, "verde", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "laranja", "laranja", "laranja", "laranja", "vermelho", "vermelho", "vermelho", "vermelho", "azul", "azul", "azul", "roxo", "roxo", "cinza"],
  [18, "verde", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "laranja", "laranja", "laranja", "vermelho", "vermelho", "vermelho", "vermelho", "azul", "azul", "azul", "azul", "roxo", "roxo", "cinza"],
  [19, "verde", "amarelo", "amarelo", "laranja", "laranja", "laranja", "laranja", "laranja", "laranja", "vermelho", "vermelho", "vermelho", "vermelho", "azul", "azul", "azul", "roxo", "roxo", "roxo", "cinza"],
  [20, "verde", "amarelo", "laranja", "laranja", "laranja", "laranja", "laranja", "laranja", "laranja", "vermelho", "vermelho", "vermelho", "azul", "azul", "azul", "azul", "roxo", "roxo", "roxo", "cinza"]
];

const table_resFisMag = [
  [-2, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20],
  [-1, 13, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20],
  [ 0, 12, 13, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 20, 20, 20, 20, 20],
  [ 1, 11, 12, 13, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 20, 20, 20, 20],
  [ 2, 10, 11, 12, 13, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 20, 20, 20],
  [ 3,  9, 10, 11, 12, 13, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 20, 20],
  [ 4,  8,  9, 10, 11, 12, 13, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 20],
  [ 5,  7,  8,  9, 10, 11, 12, 13, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20],
  [ 6,  7,  7,  8,  9, 10, 11, 12, 13, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 20],
  [ 7,  6,  7,  7,  8,  9, 10, 11, 12, 13, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19],
  [ 8,  6,  6,  7,  7,  8,  9, 10, 11, 12, 13, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19],
  [ 9,  5,  6,  6,  7,  7,  8,  9, 10, 11, 12, 13, 14, 15, 15, 16, 16, 17, 17, 18, 18],
  [10,  5,  5,  6,  6,  7,  7,  8,  9, 10, 11, 12, 13, 14, 15, 15, 16, 16, 17, 17, 18],
  [11,  4,  5,  5,  6,  6,  7,  7,  8,  9, 10, 11, 12, 13, 14, 15, 15, 16, 16, 17, 17],
  [12,  4,  4,  5,  5,  6,  6,  7,  7,  8,  9, 10, 11, 12, 13, 14, 15, 15, 16, 16, 17],
  [13,  3,  4,  4,  5,  5,  6,  6,  7,  7,  8,  9, 10, 11, 12, 13, 14, 15, 15, 16, 16],
  [14,  3,  3,  4,  4,  5,  5,  6,  6,  7,  7,  8,  9, 10, 11, 12, 13, 14, 15, 15, 16],
  [15,  2,  3,  3,  4,  4,  5,  5,  6,  6,  7,  7,  8,  9, 10, 11, 12, 13, 14, 15, 15],
  [16,  2,  2,  3,  3,  4,  4,  5,  5,  6,  6,  7,  7,  8,  9, 10, 11, 12, 13, 14, 15],
  [17,  2,  2,  2,  3,  3,  4,  4,  5,  5,  6,  6,  7,  7,  8,  9, 10, 11, 12, 13, 14],
  [18,  2,  2,  2,  2,  3,  3,  4,  4,  5,  5,  6,  6,  7,  7,  8,  9, 10, 11, 12, 13],
  [19,  2,  2,  2,  2,  2,  3,  3,  4,  4,  5,  5,  6,  6,  7,  7,  8,  9, 10, 11, 12],
  [20,  2,  2,  2,  2,  2,  2,  3,  3,  4,  4,  5,  5,  6,  6,  7,  7,  8,  9, 10, 11]
];

Hooks.once("init", function(){
  game.tagmar = {
    tagmarItem,
    tagmarActor,
    rollItemMacro
  };
  CONFIG.Combat.initiative = {
    formula: "1d10 + @iniciativa",
    decimals: 2
  };
  CONFIG.Item.documentClass = tagmarItem;
  CONFIG.Actor.documentClass = tagmarActor;
  CONFIG.time.roundTime = 15;
  // Register System Settings
  SystemSettings();
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("tagmar", tagmarItemSheet, {makeDefault: true});

  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("tagmar", tagmarActorSheet, {makeDefault: true});
  Actors.registerSheet("tagmar", tagmarAltSheet, {makeDefault: false});

  Handlebars.registerHelper('ifeq', function (a, b, options) {
    if (a == b) { return options.fn(this); }
    return options.inverse(this);
  });

  Handlebars.registerHelper('ifgr', function (a, b, options) {
    if (a > b) { return options.fn(this); }
    return options.inverse(this);
  });

  Handlebars.registerHelper('ifle', function (a, b, options) {
    if (a <= b) { return options.fn(this); }
    return options.inverse(this);
  });

  Handlebars.registerHelper('ifdf', function (a, b, options) {
    if (a != b) { return options.fn(this); }
    return options.inverse(this);
  });

  Handlebars.registerHelper('ifind', function (a, b, options) {
    if (typeof a === 'undefined') return;
    const a_list = a.split(',');
    const found = a_list.find(element => element == b);
    if (found) {
      return options.fn(this);
    } 
    return options.inverse(this);
  });

  Handlebars.registerHelper('idfind', function (a, b, options) {
    if (typeof a === 'undefined') return;
    const a_list = a.split(',');
    const found = a_list.find(element => element == b);
    if (!found) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  Handlebars.registerHelper('soma', function(a, b, c, d, options) {
    let soma = a + b + c + d;
    return soma;
  });

  Handlebars.registerHelper('multiplica', function(a, b, options) {
    let mult = a * b;
    return mult.toFixed(2);
  });

  Handlebars.registerHelper('toFixed', function(value, decimal, options) {
    return parseFloat(value).toFixed(decimal);
  });

  Handlebars.registerHelper('settingTrue', function(setting, options) {
    if (game.settings.get('tagmar_rpg', setting)) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  Handlebars.registerHelper('fichaPontos', function (data, options) {
    let actor = game.actors.find(a => a.items.find(i => i.id == data._id));
    if (typeof actor != 'undefined') {
      if (actor.ficha != "Sorteio") {
        return options.inverse(this);
      }
    }
    return options.fn(this);
  });

  Handlebars.registerHelper('settingFalse', function(setting, options) {
    if (!game.settings.get('tagmar_rpg', setting)) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  Handlebars.registerHelper('pontos_carac', function(estagio) {
    let pontos = 3;
    if (estagio > 0) {
      if (estagio == 1) return pontos;
      else {
        for (let x = 2; x <= estagio; x++) {
          if ((x % 2) != 0) {
            pontos += 1;
          }
        }
        return pontos;
      }
    } else return 0;
  });

  preloadHandlebarsTemplates();

  if (game.modules.get('polyglot')) {
    if (!game.modules.get('polyglot').active) return;
    import("/modules/polyglot/module/LanguageProvider.js").then(function (LanguageProvider) {
      class TagmarLanguageProvider extends LanguageProvider.LanguageProvider {
        get originalTongues() {
          return {
              _default: "oldeenglish",
              males: "oldeenglish",
              leva: "oldethorass",
              lud: "qijomi",
              eredri: "semphari",
              verrogari: "oriental",
              dantseniano: "reanaarian",
              maranes: "miroslavnormal",
              lunes: "kargi",
              runes: "elderfuthark",
              abadrim: "meroiticdemotic",
              planense: "maraseye",
              linguacomumdascidadesestados: "chinese",
              linguacomumdosmangues: "orkglyphs",
              rubeo: "floki",
              lazuli: "highdrowic",
              linguasbarbaras: "dovah",
              aktar: "oldethorass",
              dictio: "nordic",
              birso: "nordic",
              povosdodeserto: "valmaric",
              lanta: "thorass",
              avozdepedra: "dethek",
              elfico: "espruar",
              tessaldar: "celestial",
              kurng: "dovah",
              linguadasfadas: "celestial",
              linguadosdragoes: "iokharic",
              linguasselvagens: "magescript",
              marante: "cyrillic",
              infernal: "infernal",
              abissal: "infernal"
          };
        }
        getSystemDefaultLanguage() {
          this.tongues = this.originalTongues;
          return "males";
        }
        get requiresReady() {
          return false;
        }
        async getLanguages() {
          const langs = {
            males: "Malês",
            leva: "Leva",
            lud: "Lud",
            eredri: "Eredri",
            verrogari: "Verrogari",
            dantseniano: "Dantseniano",
            maranes: "Maranês",
            lunes: "Lunês",
            runes: "Runês",
            abadrim: "Abadrim",
            planense: "Planense",
            linguacomumdascidadesestados: "Língua comum das Cidades-Estados",
            linguacomumdosmangues: "Língua comum dos Mangues",
            rubeo: "Rúbeo",
            lazuli: "Lazúli",
            linguasbarbaras: "Línguas bárbaras",
            aktar: "Aktar",
            dictio: "Díctio",
            birso: "Birso",
            povosdodeserto: "Povos do deserto",
            lanta: "Lanta",
            avozdepedra: "A voz de pedra",
            elfico: "Élfico",
            tessaldar: "Tessaldar",
            kurng: "Kurng",
            linguadasfadas: "Língua das fadas",
            linguadosdragoes: "Língua dos dragões",
            linguasselvagens: "Línguas selvagens",
            marante: "Marante",
            infernal: "Infernal",
            abissal: "Abissal"
          };     
          this.languages = langs;
        }
        getUserLanguages(actor) {
          let known_languages = new Set();
          let literate_languages = new Set();
          let linguas = actor.data.data.defesa.categoria.split(';');
          for (let lang of linguas) {
            known_languages.add(lang);
          }
          return [known_languages, literate_languages];
        }
      }
      polyglot.registerSystem(game.system.id, TagmarLanguageProvider);
    });
  }
  
});

Hooks.once("ready", async function () {
  Hooks.on("hotbarDrop", (bar, data, slot) => createTagmarMacro(data, slot));
  boasVindas();
  $('#logo').attr('src', '/systems/tagmar_rpg/templates/sheets/img/logo.png');
  $('#logo').click(function () {
    if (!ocultos) {
      $('#controls').addClass('esconde');
      $('#navigation').addClass('esconde');
      $('#hotbar').addClass('esconde');
      $('#players').addClass('esconde');
      ocultos = true;
    } else {
      $('#controls').removeClass('esconde');
      $('#navigation').removeClass('esconde');
      $('#players').removeClass('esconde');
      $('#hotbar').removeClass('esconde');
      ocultos = false;
    }
  }); 
});

Hooks.on('renderPlayerList', function () {
  if (ocultos) {
    $('#players').addClass('esconde');
  } else {
    $('#players').removeClass('esconde');
  }
});

Hooks.on('renderSceneNavigation', function () {
  if (ocultos) {
    $('#navigation').addClass('esconde');
  } else {
    $('#navigation').removeClass('esconde');
  }
});

Hooks.on('renderSceneControls', function () {
  if (ocultos) {
    $('#controls').addClass('esconde');
  } else {
    $('#controls').removeClass('esconde');
  }
});

function boasVindas () {
  if(!game.user.getFlag("tagmar_rpg","boasVindas")) {
    let contento = '<img src="/systems/tagmar_rpg/templates/sheets/img/logo.png" style="display: block; margin-left: auto; margin-right: auto; border-width: 0;" /><h1 class="fairyDust rola" style="text-align:center;">Tagmar RPG</h1>';
    let tagmar_prj = '<p class="rola_desc mediaeval">Conheça sobre o <a href="https://tagmar.com.br/" title="Acessar o site de Tagmar">Projeto Tagmar</a>.</p>';
    let sys_text = '<p class="rola_desc mediaeval">Saiba mais sobre o sistema <a href="https://foundryvtt.com/packages/tagmar">Tagmar RPG no Foundry</a> e também no <a href="https://github.com/marcoswalker/tagmar">GitHub</a>.</p>';
    let youtChan = '<p class="rola_desc mediaeval">Acesse nosso canal no <a href="https://www.youtube.com/channel/UCDyR_0eg3TjV5r5cOUqQaSQ">Youtube</a>.</p>';
    let credits = '<p class="rola_desc"><span class="creditos mediaeval">por Vinicius Fernandez (Pirata) e Marcos Walker</span></p>'
    let options = {
      whisper:[game.user.id],
      content: "<div class='bg-img-items'>" + contento + tagmar_prj + sys_text + youtChan + credits + "</div>"
    };
    ChatMessage.create(options);
    game.user.setFlag("tagmar_rpg", "boasVindas", true);
  }
}

Hooks.on('createToken',async function (document) {
  if (!game.user.isGM) return;
  const token = document.data;
  if (!token.actorLink) {
    try {
      let tokenactor = duplicate(document.actor);
      tokenactor.name = tokenactor.name + " Cópia";
      let actor = await Actor.create(tokenactor);
      await token.document.update({
        'actorId': actor.data._id,
        'actorLink': true
      });
    } catch (e) {
      ui.notifications.error("Ocorreu um erro, delete esse token e crie novamente. " + e);
    }
  } 
});

Hooks.on('preCreateToken', async function (document) {
  if (!game.user.isGM) return;
  const settingBars = game.settings.get("tagmar_rpg", "autoBars");
  if (settingBars != "no") {
    if (game.modules.get('barbrawl') && game.modules.get('barbrawl').active) {
      let resources = createBrawrs(document, settingBars);
      if (Object.keys(resources).length > 0) {
        await document.data.update({
          'flags.barbrawl.resourceBars': 0,
          'bar1.attribute': "",
          'bar2.attribute': ""
        });
        document.data.update({'flags.barbrawl.resourceBars': resources});
      }
    }
    else ui.notifications.warn("Instale e ative o módulo Bar Brawl!");
  }
});

Hooks.on('tagmar_combate_roll', function (rollData) {
  if (game.user != rollData.user) return;
  let input_dano = $('#sidebar #chat #danos #soma_dano');
  let valor = 0;
  if (parseInt(input_dano.val())) valor = parseInt(input_dano.val());
  valor += rollData.dano;
  input_dano.val(valor);
});

Hooks.once('renderChatLog', function (chatLog, html, css) {
  let apaga_dano = $(`<a id="apaga_dano" style="height:20px;" title="Apagar e enviar ao chat."><i class="far fa-trash-alt"></i></a>`);
  let input_dano = $(`<input type="number" style="background-color: white;" id="soma_dano"/>`);
  apaga_dano.click(function (event) {
    let valor = 0;
    if (parseInt(input_dano.val())) valor = parseInt(input_dano.val());
    if (valor != 0) ChatMessage.create({
      user: game.user,
      content: `<p class="mediaeval rola_desc">Dano somado: ${valor}</p>`,
      speaker: ChatMessage.getSpeaker({ alias: game.user.name })
    });
    $(input_dano).val(0);
  });
  let div_danos = $(`<div id="danos" class="flexrow" style="flex: 0 0 28px;margin: 0 6px;align-content: center;"></div>`);
  div_danos.append(apaga_dano);
  div_danos.append($(`<label>Somar Dano:</label>`));
  div_danos.append(input_dano);
  div_danos.insertBefore($(html.find('#chat-controls')));
  if (!game.user.isGM) return;
  let button = $('<a class="button export-to-journal" title="Salvar log do chat em um Journal."><i class="fas fa-archive"></i></a>');
  button.click(function () {
    let content = html.find('[id="chat-log"]').html();
    let date = new Date();
    const dia = date.getDate();
    const mes = date.getMonth();
    const ano = date.getFullYear();
    const hora = date.getHours();
    const min = date.getMinutes();
    JournalEntry.create({
      name: `ChatLog ${dia}/${mes+1}/${ano} - ${hora}:${min}`,
      content: content
    });
    ui.notifications.info("Registro do chat armazenado em um Journal!");
  });
  $(html.find('.export-log')).remove();
  $(html.find('.control-buttons')).append(button);
});

function createBrawrs(token, setting) {
  const actor = token.actor;
  let resources = {};
  if (setting == "barra_pers") {
    if (actor.data.type == "Personagem") {
      resources = {
        "bar1": {
            id: "bar1",
            mincolor: "#fbff00",
            maxcolor: "#00ff08",
            position: "top-outer",
            attribute: "eh",
            visibility: CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER,
            ignoreMax: true
        },
        "bar2": {
          id: "bar2",
          mincolor: "#fbff00",
          maxcolor: "#6b6b6b",
          position: "top-outer",
          attribute: "absorcao",
          visibility: CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER
        },
        "bar3": {
          id: "bar3",
          mincolor: "#fbff00",
          maxcolor: "#ff0000",
          position: "top-outer",
          attribute: "ef",
          visibility: CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER,
          ignoreMax: true,
          ignoreMin: true
        },
        "bar4": {
          id: "bar4",
          mincolor: "#fbff00",
          maxcolor: "#a600ff",
          position: "bottom-outer",
          attribute: "karma",
          visibility: CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER
        },
        "bar5": {
          id: "bar5",
          mincolor: "#fbff00",
          maxcolor: "#003399",
          position: "bottom-outer",
          attribute: "focus",
          visibility: CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER
        }
      };
    }
  } else if (setting == "barra_npc") {
    if (actor.data.type == "NPC") {
      resources = {
        "bar1": {
            id: "bar1",
            mincolor: "#fbff00",
            maxcolor: "#00ff08",
            position: "bottom-outer",
            attribute: "eh_npc",
            visibility: CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER,
            ignoreMax: true
        },
        "bar2": {
          id: "bar2",
          mincolor: "#fbff00",
          maxcolor: "#6b6b6b",
          position: "bottom-outer",
          attribute: "absorcao",
          visibility: CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER
        },
        "bar3": {
          id: "bar3",
          mincolor: "#fbff00",
          maxcolor: "#ff0000",
          position: "bottom-outer",
          attribute: "ef_npc",
          visibility: CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER,
          ignoreMax: true,
          ignoreMin: true
        },
        "bar4": {
          id: "bar4",
          mincolor: "#fbff00",
          maxcolor: "#a600ff",
          position: "bottom-outer",
          attribute: "karma_npc",
          visibility: CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER
        }
      };
    }
  } else if (setting == "barra_both") {
    if (actor.data.type == "Personagem") {
      resources = {
        "bareh": {
            id: "bareh",
            mincolor: "#fbff00",
            maxcolor: "#00ff08",
            position: "top-outer",
            attribute: "eh",
            visibility: CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER,
            ignoreMax: true
        },
        "barab": {
          id: "barab",
          mincolor: "#fbff00",
          maxcolor: "#6b6b6b",
          position: "top-outer",
          attribute: "absorcao",
          visibility: CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER
        },
        "baref": {
          id: "baref",
          mincolor: "#fbff00",
          maxcolor: "#ff0000",
          position: "top-outer",
          attribute: "ef",
          visibility: CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER,
          ignoreMax: true,
          ignoreMin: true
        },
        "barkm": {
          id: "barkm",
          mincolor: "#fbff00",
          maxcolor: "#a600ff",
          position: "bottom-outer",
          attribute: "karma",
          visibility: CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER
        },
        "barfo": {
          id: "barfo",
          mincolor: "#fbff00",
          maxcolor: "#003399",
          position: "bottom-outer",
          attribute: "focus",
          visibility: CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER
        }
      };
    } else if (actor.data.type == "NPC") {
      resources = {
        "bar1": {
            id: "bar1",
            mincolor: "#fbff00",
            maxcolor: "#00ff08",
            position: "bottom-outer",
            attribute: "eh_npc",
            visibility: CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER,
            ignoreMax: true
        },
        "bar2": {
          id: "bar2",
          mincolor: "#fbff00",
          maxcolor: "#6b6b6b",
          position: "bottom-outer",
          attribute: "absorcao",
          visibility: CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER
        },
        "bar3": {
          id: "bar3",
          mincolor: "#fbff00",
          maxcolor: "#ff0000",
          position: "bottom-outer",
          attribute: "ef_npc",
          visibility: CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER,
          ignoreMax: true,
          ignoreMin: true
        },
        "bar4": {
          id: "bar4",
          mincolor: "#fbff00",
          maxcolor: "#a600ff",
          position: "bottom-outer",
          attribute: "karma_npc",
          visibility: CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER
        }
      };
    }
  }
  return resources;
}

Hooks.once("dragRuler.ready", (SpeedProvider) => {
  class TagmarSpeedProvider extends SpeedProvider {
      get colors() {
          return [
              {id: "walk", default: 0xFFFF00, name: "tagmar_rpg.speeds.walk"},
              {id: "dash", default: 0x00FF00, name: "tagmar_rpg.speeds.dash"},
              {id: "run", default: 0xFF8000, name: "tagmar_rpg.speeds.run"}
          ];
      }

      getRanges(token) {
          const baseSpeed = token.actor.data.data.vb;

    // A character can always walk it's base speed and dash twice it's base speed
    const ranges = [
      {range: baseSpeed, color: "walk"},
      {range: baseSpeed / 2, color: "dash"}
    ];
          return ranges;
      }
  }

  dragRuler.registerSystem("tagmar_rpg", TagmarSpeedProvider);
});

Hooks.once('diceSoNiceReady', function (dice) {
  dice.addSystem({ id: game.system.id, name: "Tagmar RPG"}, true);
  dice.addDicePreset({
    type: 'd2',
    labels: [
      '1',
      'systems/'+game.system.id+'/assets/logodice.png'
    ],
    system: game.system.id
  });
  dice.addDicePreset({
    type: 'd10',
    labels: [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'systems/'+game.system.id+'/assets/logodice.png'
    ],
    system: game.system.id
  });
  dice.addDicePreset({
    type: 'd20',
    labels: [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      'systems/'+game.system.id+'/assets/logodice.png',
    ],
    system: game.system.id
  });
  dice.addColorset({
    name: game.system.id,
    description: ' * Tagmar RPG * ',
    category: 'Colors',
    foreground: '#55420a',
    background: '#6b6b6b',
    outline: '#000000',
    texture: 'metal',
    material: 'metal',
    font: 'Verdana',
    default: true,
  });
  if (game.user.data.name == "AGROK") game.user.setFlag('dice-so-nice', 'appearance', { "global": {"labelColor": "#dea822", "diceColor": "#000000",
    "outlineColor": "#dea822", "edgeColor": "#dea822", "texture": "metal", "material": "metal", "font": "Bradley Hand", "colorset": "custom", "system": "tagmar_rpg"} });
  else game.user.setFlag('dice-so-nice', 'appearance', { "global": {"system": "tagmar_rpg"}});
});

Hooks.on('renderChatMessage', function (message, jq, messageData) {
  const fonte_size = game.settings.get('tagmar_rpg', 'fonteMsg');
  const rola_desc = jq.find('.rola_desc');
  if (fonte_size > 0) $(rola_desc).css('font-size', fonte_size.toString()+'%');
  else $(rola_desc).css('font-size', '100%');
  jq.find('.showDesc').on('click', function () {
    if (jq.find('.rola_desc').css('display') == 'none') {
      jq.find('.rola_desc').css('display','block');
      jq.find('.showDesc').html('Descrição: <i class="far fa-eye"></i>');
    }
    else {
      jq.find('.rola_desc').css('display','none');
      jq.find('.showDesc').html('Descrição: <i class="far fa-eye-slash"></i>');
    }
  });
});

Hooks.on('tagmar_Critico', async function (coluna, tabela_resol, user, actor) {
  if (game.user !== user) return;
  await rolarCritico(coluna, tabela_resol, user, actor);
});

async function rolarCritico(coluna, tabela_resol, user, actor) {
  let roll = new Roll('1d20');
  roll.evaluate({async: false});
  let result = roll.total;
  let conteudo = "";
  let col_tab = tabela_resol.filter(h => h[0] == coluna);
  let resultado = col_tab[0][result];
  if (resultado == "cinza") {
    conteudo = "<h1 class='mediaeval rola' style='text-align:center;'>Rolagem do Crítico</h1><br><h1 class='mediaeval rola' style='color: black; text-align:center;background-color:#bfbfbf;'>Cinza</h1>";
    conteudo = conteudo + "<br><p class='mediaeval rola_desc'><b>Corte: </b>O Oponente é decapitado.<br><b>Esmagamento: </b>Afundamento torácico destrói os pulmões.<br><b>Penetração: </b>Golpe perfura o coração.<br><b>Garras/Mordida: </b>Força do golpe rasga a carótida.<br><b>Magia: </b>Impacto total da magia mata o adversário.<br><b>Falha: </b>Um golpe ruim. Erra o adversário.<br><b>10 a 50 vezes o peso do atacante: </b>100%. Golpe paralisa por uma rodada causando um ferimento fatal e impondo um ajuste de – 10, depois de 7 rodadas o oponente morre.<br><b>Peso acima de 50 vezes: </b>100%. Ferimento no oponente reduz o número de ataques pela metade (se for só 1, passa a ser um a cada duas rodadas).<br><b>Combate Desarmado: </b>100%. Nocaute, oponente fica desmaiado por 1 hora e incapacitado por 2 dias.</p>";
  } else if (resultado == "roxo") {
    conteudo = "<h1 class='mediaeval rola' style='text-align:center;'>Rolagem do Crítico</h1><br><h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#0000ff;'>Azul Escuro</h1>";
    conteudo = conteudo + "<br><p class='mediaeval rola_desc'><b>Corte: </b>100%. Corte vaza o olho. A dor paralisa o adversário por duas rodadas.<br><b>Esmagamento: </b>100%. Golpe no pulso destrói a articulação, obrigando a amputação em 2 dias. O inimigo é paralisado por duas rodadas.<br><b>Penetração: </b>100%. Estocada na mão, inutiliza permanentemente. A dor paralisa o inimigo por duas rodadas.<br><b>Garras/Mordida: </b>100%. Ataque no olho arranca o globo ocular e paralisa o adversário por duas rodadas.<br><b>Magia: </b>100% Impacto no pé do adversário o destrói, e ele fica paralisado por duas rodadas.<br><b>Falha: </b>Descontrole dá um ajuste de – 3 nas próximas duas rodadas.<br><b>10 a 50 vezes o peso do atacante: </b>100%. Ferimento no oponente reduz o número de ataques pela metade (se for só 1, passa a ser um a cada duas rodadas).<br><b>Peso acima de 50 vezes: </b>100%. Golpe paralisa o oponente por uma rodada e impõe um ajuste de – 5 por 10 rodadas.<br><b>Combate Desarmado: </b>100%. Nocaute, oponente fica desmaiado por meia hora.</p>";
  } else if (resultado == "azul") {
    conteudo = "<h1 class='mediaeval rola' style='text-align:center;'>Rolagem do Crítico</h1><br><h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#00a1e8;'>Azul</h1>";
    conteudo = conteudo + "<br><p class='mediaeval rola_desc'><b>Corte: </b>100%. Corte grande no músculo inutiliza um braço por uma semana.<br><b>Esmagamento: </b>100%. Pancada na cabeça. Elmo se parte (caso não seja mágico). Se não tiver Elmo entra em coma por 2 dias.<br><b>Penetração: </b>100%. Perfura o músculo do braço e o inutiliza por uma semana.<br><b>Garras/Mordida: </b>100%. Ataque arranca uma orelha e paralisa o adversário por uma rodada.<br><b>Magia: </b>100%. O poder da magia leva o inimigo a inconsciência por um dia.<br><b>Falha: </b>Descontrole dá um ajuste de – 4 nas próximas 3 rodadas.<br><b>10 a 50 vezes o peso do atacante: </b>100%. Golpe paralisa o oponente por duas rodadas e impõe um ajuste de – 5 por 10 rodadas.<br><b>Peso acima de 50 vezes: </b>100%. Ferimento desnorteia o oponente impedindo-o de atacar por uma rodada.<br><b>Combate Desarmado: </b>100%. Oponente tonto não ataca por duas rodadas.</p>";
  } else if (resultado == "vermelho") {
    conteudo = "<h1 class='mediaeval rola' style='text-align:center;'>Rolagem do Crítico</h1><br><h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#ff0000;'>Vermelho</h1>";
    conteudo = conteudo + "<br><p class='mediaeval rola_desc'><b>Corte: </b>75%. Corte mediano no músculo inutiliza um braço por 2 dias.<br><b>Esmagamento: </b>75%. Pancada na cabeça. Elmo se parte (caso não seja mágico). Se não tiver Elmo fica desacordado por 2 horas e incapacito por 2 dias.<br><b>Penetração: </b>75%. Perfura o músculo do braço e o inutiliza por 2 dias.<br><b>Garras/Mordida: </b>75%. Ataque rasga o braço causando um ajuste de - 8 por 2 dias.<br><b>Magia: </b>75%. O poder da magia leva o inimigo a inconsciência por meia hora.<br><b>Falha: </b>Ataque precipitado causa 25 % de dano em si mesmo.<br><b>10 a 50 vezes o peso do atacante: </b>75%. Golpe paralisa o oponente por uma rodada e impõe um ajuste de – 5 por 10 rodadas.<br><b>Peso acima de 50 vezes: </b>75%. Golpe reduz a velocidade base à metade e o impede de realizar sua próxima ação.<br><b>Combate Desarmado: </b>75%. Golpe desarma o oponente e o derruba, a arma cai a 3m dele.</p>";
  } else if (resultado == "laranja") {
    conteudo = "<h1 class='mediaeval rola' style='text-align:center;'>Rolagem do Crítico</h1><br><h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#ff9900;'>Laranja</h1>";
    conteudo = conteudo + "<br><p class='mediaeval rola_desc'><b>Corte: </b>75%. Corte na cabeça põe adversário em coma por 1 dia se ele não tiver usando elmo.<br><b>Esmagamento: </b>75%. Escudo do inimigo se quebra (caso não seja mágico). Na ausência deste o braço quebra (cura em um mês).<br><b>Penetração: </b>75%. Golpe no tronco derruba o adversário se estiver usando escudo. Caso contrário incapacita-o por 2 dias.<br><b>Garras/Mordida: </b>75%. A ferocidade do golpe derruba o adversário impedindo de atacar nas próximas 3 rodadas.<br><b>Magia: </b>75%. O potente impacto paralisa o adversário, impedindo de atacar nas próximas 3 rodadas.<br><b>Falha: </b>Ataque desastroso causa 50 % de dano em si mesmo.<br><b>10 a 50 vezes o peso do atacante: </b>75%. Ferimento desnorteia o oponente impedindo-o de atacar por duas rodadas.<br><b>Peso acima de 50 vezes: </b>75%. Golpe reduz a velocidade base à metade e impõe ao adversário um ajuste de – 3 por 5 rodadas.<br><b>Combate Desarmado: </b>75%. A dor ou falta de ar deixam o oponente grogue. Ajuste de - 5 por 4 rodadas.</p>";
  } else if (resultado == "amarelo") {
    conteudo = "<h1 class='mediaeval rola' style='text-align:center;'>Rolagem do Crítico</h1><br><h1 class='mediaeval rola' style='color: black; text-align:center;background-color:#ffff00;'>Amarelo</h1>";
    conteudo = conteudo + "<br><p class='mediaeval rola_desc'><b>Corte: </b>50%. Com um belo golpe, não só atinge como desarma o inimigo.<br><b>Esmagamento: </b>50%. Golpe no tórax derruba o adversário, que deixa cair o que tiver segurando.<br><b>Penetração: </b>50% Estocada no peito paralisa o adversário nas próximas 2 rodadas.<br><b>Garras/Mordida: </b>50%. Feroz ataque na mão desarma o inimigo.<br><b>Magia: </b>50%. A força da magia arremessa o adversário a 2 metros de distância, e ele deixa cair sua arma.<br><b>Falha: </b>Sua arma escapa da sua mão, caindo a 3 metros de distância.<br><b>10 a 50 vezes o peso do atacante: </b>50%. Golpe faz com que o adversário se atrapalhe, impedindo-o de realizar sua próxima ação.<br><b>Peso acima de 50 vezes: </b>50%. Golpe impõe ao adversário um ajuste de – 3 por 5 rodadas.<br><b>Combate Desarmado: </b>50%. Inchaço e sangramento facial atrapalham a visão. Ajuste de - 3 por 6 rodadas.</p>";
  } else if (resultado == "branco") {
    conteudo = "<h1 class='mediaeval rola' style='text-align:center;'>Rolagem do Crítico</h1><br><h1 class='mediaeval rola' style='color: black; text-align:center;background-color:white;'>Branco</h1>";
    conteudo = conteudo + "<br><p class='mediaeval rola_desc'><b>Corte: </b>50%. Corte no ombro, impõe um ajuste de – 4 por 1 dia.<br><b>Esmagamento: </b>50%. Golpe duro no ombro, paralisa o oponente na próxima rodada.<br><b>Penetração: </b>50%. Penetração causa ajuste de – 4 por 2 dias. Se for flecha o ajuste é de - 6 até que a mesma seja retirada.<br><b>Garras/Mordida: </b>50%. Rasgo na mão impede o adversário de realizar seu próximo ataque.<br><b>Magia: </b>50%. O poder da magia atordoa o inimigo, impedindo de realizar seu próximo ataque.<br><b>Falha: </b>Tropeção o impede de realizar seu próximo ataque.<br><b>10 a 50 vezes o peso do atacante: </b>50%. Golpe reduz a velocidade base à metade e impõe ao adversário um ajuste de – 3 por 5 rodadas.<br><b>Peso acima de 50 vezes: </b>50%. Golpe impõe ao adversário um ajuste de – 3 por 3 rodadas.<br><b>Combate Desarmado: </b>50%. Golpe desarma o oponente, e a arma cai a 2 m dele.</p>";
  } else if (resultado == "verde") {
    conteudo = "<h1 class='mediaeval rola' style='text-align:center;'>Rolagem do Crítico</h1><br><h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#91cf50;'>Verde</h1>";
    conteudo = conteudo + "<br><p class='mediaeval rola_desc'><b>Corte: </b>25%. Corte leve no músculo do braço dá um ajuste de – 4 na próxima rodada.<br><b>Esmagamento: </b>25%. Golpe no ombro desequilibra o adversário na próxima rodada, dando um ajuste de – 4.<br><b>Penetração: </b>25% Estocada na perna reduz o movimento à metade e causa um ajuste de – 2 por 1 hora.<br><b>Garras/Mordida: </b>25%. Ataque desequilibra o inimigo, levando-o a cair e perder uma rodada.<br><b>Magia: </b>25%. A magia foi evocada com maestria. Economizando 1 de karma OU causando +2 na FA.<br><b>Falha: </b>Faça um ataque no seu companheiro mais próximo.<br><b>10 a 50 vezes o peso do atacante: </b>25%. Golpe impõe ao adversário um ajuste de - 3 por 5 rodadas.<br><b>Peso acima de 50 vezes: </b>25%. ataque preciso causa um ajuste de –5 no próximo ataque.<br><b>Combate Desarmado: </b>25%. Golpe no ouvido causa desorientação. Ajuste de -3 por 3 rodadas.</p>";
  }
  roll.toMessage({
    user: user,
    speaker: ChatMessage.getSpeaker({ actor: actor }),
    flavor: conteudo
  });
}

document.addEventListener('mousedown', function (event) {
  if ((event.button == 1 || event.button == 4) && game.user.isGM) {
    const hoveredToken = canvas.tokens._hover;
    if (hoveredToken !== null) {
      event.preventDefault();
      if (!hoveredToken.isTargeted) hoveredToken.setTarget(true, game.user, true, false);
      else hoveredToken.setTarget(false);
    }
  }
});

Hooks.on('targetToken', function (user, token, targeted) {
  if (!(token.actor.data.type === "Personagem" || token.actor.data.type === "NPC")) return;
  const setting_target = game.settings.get("tagmar_rpg", "autoTarget");
  if (targeted && setting_target == "yes") setInf_ataque(token, user);
});

function setInf_ataque(target_token, user) {
  if (user == game.user) {
    const speaker = ChatMessage.getSpeaker();
    let actor = game.actors.get(speaker.actor);
    if (!actor) return ui.notifications.warn("Selecione um Token para setar Def. Oponente!");
    if (actor.data.type == "Inventario") return ui.notifications.error("Não é possível atacar com um Inventário.");
    actor.update({
      'data.inf_ataque.cat_def': target_token.actor.data.data.d_ativa.categoria,
      'data.inf_ataque.valor_def': target_token.actor.data.data.d_ativa.valor
    });
    let chatData = {
      user: game.user.id,
      speaker: ChatMessage.getSpeaker({
          actor: actor
        })
    };
    let target_def = target_token.actor.data.data.d_ativa;
    chatData.content = "<p><img src='"+ actor.img +"' style='float: left; margin-left: auto; margin-right: auto; width: 40%;border: 0px;' /><img src='systems/tagmar_rpg/assets/TAGMAR FOUNDRY.png' style='float: left;margin-top:25px; margin-left: auto; margin-right: auto; width: 20%;border: 0px;'/><img src='"+ target_token.actor.img +"' style='float: left; width: 40%; margin-left: auto; margin-right: auto;border: 0px;' /></p><p class='rola_desc mediaeval' style='display: block;margin-left:auto;margin-right:auto;margin-top:60%;'>"+ "<b>Agressor: </b>" + actor.data.name + "<br><b>Bônus de Ataque: </b>"+ String(actor.data.data.inf_ataque.bonus) +"<br><b>Oponente: </b>" + target_token.actor.data.name  +"<br><b>Def. Oponente: </b>"+ target_def.categoria + String(target_def.valor) +"</p>";
    ChatMessage.create(chatData);
  }
}

Hooks.on('renderUserConfig', function (UserConfig, html , User) {
  let actors = User.actors;
  let lista = html.find('.actor');
  lista.each(function (index, li) {
    let actor_id = $(li).data('actorId');
    let actor = actors.find(a => a.id == actor_id);
    if (actor.data.type != "Personagem") $(li).addClass('esconde');
  });
});

Hooks.on('renderActorDirectory', function (actordirectory, html, user) {
  if (user.user.isGM) return;
  let list = html.find('.actor');
  list.each(function (index, li) {
    let actor = actordirectory.documents.find(a => a.id == $(li).data('entityId'));
    if (actor.data.type == "Inventario") $(li).addClass('esconde');
  });
});

Hooks.on("getSceneControlButtons", (controls) => {
  const bar = controls.find(c => c.name === "token");
  if (game.user.isGM) {
    bar.tools.push({
      name: "Rolar direto na tabela ou Teste de Resistência",
      icon: "fas fa-dice-d20",
      title: "Rolagem do Mestre",
      onClick: async () => rollDialog(),
      button: true
    });
  } else {
    bar.tools.push({
      name: "Centralizar Canvas no Token",
      icon: "fas fa-anchor",
      title: "Centralizar Canvas no Token",
      onClick: async () => centralizaToken(),
      button: true
    });
  }
  bar.tools.push({
    name: "Tabela de Resolução de Ações",
    icon: "fas fa-border-all",
    title: "Tabela de Resolução de Ações",
    onClick: () => tabelaAcoes(),
    button: true
  });
  bar.tools.push({
    name: "Tabela de Teste de Resistência Física / Resistência à Magia",
    icon: "fas fa-table",
    title: "Tabela de Teste de Resistência Física / Resistência à Magia",
    onClick: () => tabelaResistencia(),
    button: true
  });
});

function tabelaResistencia () {
  let dialogContent = `<table class="mediaeval" style="text-align:center;">
    <tr>
      <td></td>
      <th>FORÇA DE ATAQUE</th>
    </tr>
    <tr>
      <th>
      <p style="writing-mode: vertical-rl;text-orientation: upright;">FORÇA DE DEFESA</p>
      </th>
      <td>
        <table class="tableResist"></table>
      </td>
    </tr>
  </table>`;
  let dialog = new Dialog({
    title: "Tabela de Teste de Resistência Física / Resistência à Magia",
    content: dialogContent,
    buttons: {},
    render: (html) => {
      let table_res = html.find('.tableResist');
      let table_lines = "<tr>";
      for (let l = 0; l <= 20; l++) {
        if (l == 0) table_lines += `<th></th>`;
        else table_lines += `<th style='background-color:black;color:white;'>${l}</th>`;
      }
      table_lines += "</tr>";
      for(let linha of table_resFisMag) {
        table_lines += "<tr>";
        linha.forEach(function (l, index) {
          let style = "border: 1px solid black;";
          if (table_resFisMag.indexOf(linha) % 2 == 0) style += "background-color:white;"
          if ((l == 2 || l == 20) && index != 0) style += "background-color:white; border-width:0;";
          if (index == 0) table_lines += `<th style='${style}'>${l}</th>`;
          else table_lines += `<td style='${style}'>${l}</td>`;
        });
        table_lines += "</tr>";
      }
      table_res.append(table_lines);
    }
  },{width:800, height:700});
  dialog.render(true);
}

function tabelaAcoes () {
  let dialogContent = `<table class="tabelaAcoes mediaeval"></table>`;
  let dialog = new Dialog({
    title: "Tabela de Resolução de Acões",
    content: dialogContent,
    buttons: {},
    render: (html) => {
      let tabela = html.find(".tabelaAcoes");
      let table_head = "<tr>";
      let table_body = "";
      for(let tab of tabela_resol) {
        table_head += `<th style="text-align:center;border: 1px solid black;background-color:black;color:white;">${tab[0]}</th>`;
      }
      table_head += "</tr>";
      for(let linha = 1; linha <= 20; linha++) {
        table_body += "<tr>";
        for(let x=0; x < tabela_resol.length; x++) {
          let style = "";
          if (tabela_resol[x][linha] == "verde") style = "style='background-color:#91cf50;text-align:center;border: 1px solid black;'";
          if (tabela_resol[x][linha] == "branco") style = "style='background-color:white;text-align:center;border: 1px solid black;'";
          if (tabela_resol[x][linha] == "amarelo") style = "style='background-color:#ffff00;text-align:center;border: 1px solid black;'";
          if (tabela_resol[x][linha] == "laranja") style = "style='background-color:#ff9900;text-align:center;border: 1px solid black;'";
          if (tabela_resol[x][linha] == "vermelho") style = "style='background-color:#ff0000;text-align:center;color:white;border: 1px solid black;'";
          if (tabela_resol[x][linha] == "azul") style = "style='background-color:#00a1e8;text-align:center;color:white;border: 1px solid black;'";
          if (tabela_resol[x][linha] == "roxo") style = "style='background-color:#0000ff;text-align:center;color:white;border: 1px solid black;'";
          if (tabela_resol[x][linha] == "cinza") style = "style='background-color:#bfbfbf;text-align:center;border: 1px solid black;'";
          table_body += `<td ${style}>${linha}</td>`;
        }
        table_body += "</tr>";
      }
      
      tabela.append(table_head+table_body);
    }
  },{width:800, height:580});
  dialog.render(true);
}

async function centralizaToken () {
  if (canvas.tokens.controlled.length) {
    await canvas.animatePan({x: canvas.tokens.controlled[0].position.x, y: canvas.tokens.controlled[0].position.y});
  } else if (canvas.tokens.ownedTokens.length) {
    await canvas.animatePan({x: canvas.tokens.ownedTokens[0].position.x, y: canvas.tokens.ownedTokens[0].position.y});
  } else {
    ui.notifications.warn("Você não possui nenhum token na cena!");
  }
}

async function rollDialog() {
  $.get("systems/tagmar_rpg/templates/roll_dialog.hbs", function (data) {
    let dialog = new Dialog({
      title: "Rolagem do Mestre",
      content: data,
      buttons: {},
      render: (html) => {
        html.find(".rollResist").click(async function (event) {
          let resist = html.find('.ip_resist').val();
          let f_ataque = html.find(".ip_fAtaque").val();
          if (resist > 0 && f_ataque > 0) await rollResistencia(resist, f_ataque);
          html.find('.ip_resist').val("");
          html.find(".ip_fAtaque").val("");
        });
        html.find(".rollTabela").click(async function (event) {
          let coluna = html.find(".ip_coluna").val();
          if (coluna >= -7 && coluna <= 20) await rollTabela(coluna);
          html.find(".ip_coluna").val("");
        });
      }
    });
    dialog.render(true);
  });
}

async function rollTabela(colunaR) {
  let r = new Roll("1d20");
  let resultado = "";
  let PrintResult = "";
  r.evaluate({async: false});
  var Dresult = r.total;
  for (let i = 0; i < tabela_resol.length; i++) {
    if (tabela_resol[i][0] == colunaR) {
        resultado = tabela_resol[i][Dresult];
        if (resultado == "verde") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#91cf50;'>Verde - Falha</h1>";
        else if (resultado == "branco") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:white;'>Branco - Rotineiro</h1>";
        else if (resultado == "amarelo") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:#ffff00;'>Amarelo - Fácil</h1>";
        else if (resultado == "laranja") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#ff9900;'>Laranja - Médio</h1>";
        else if (resultado == "vermelho") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#ff0000;'>Vermelho - Difícil</h1>";
        else if (resultado == "azul" ) PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#00a1e8;'>Azul - Muito Difícil</h1>";
        else if (resultado == "roxo") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#0000ff;'>Azul Escuro - Absurdo</h1>";
        else if (resultado == "cinza") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:#bfbfbf;'>Cinza - Impossível</h1>";
        let coluna = "<h4 class='mediaeval rola'>Coluna:" + tabela_resol[i][0] + "</h4>";
        r.toMessage({
            user: game.user.id,
            speaker: ChatMessage.getSpeaker({ alias: game.user.name }),
            flavor: `<h2 class='mediaeval rola' style='text-align:center;'>Rolagem Resolução de Ações</h2>${coluna}${PrintResult}`
          });
    }
  }
}

async function rollResistencia(resist, f_ataque) {
  let forcAtaque = f_ataque;
  let valorDef = resist;
  let def_ataq = valorDef - forcAtaque;
  let stringSucesso = "";
  let valorSucess = 0;
  if ((valorDef >= -2 && valorDef <= 20) && (forcAtaque >= 1 && forcAtaque <= 20)) {
    let coluna = table_resFisMag.find(col => col[0] == valorDef);
    valorSucess = coluna[forcAtaque];
  } else {
    if (def_ataq == 0) valorSucess = 11;
    else if (def_ataq == 1) valorSucess = 10;
    else if (def_ataq == 2) valorSucess = 9;
    else if (def_ataq == 3) valorSucess = 8;
    else if (def_ataq == 4 || def_ataq == 5) valorSucess = 7;
    else if (def_ataq == 6 || def_ataq == 7) valorSucess = 6;
    else if (def_ataq == 8 || def_ataq == 9) valorSucess = 5;
    else if (def_ataq == 10 || def_ataq == 11) valorSucess = 4;
    else if (def_ataq == 12 || def_ataq == 13) valorSucess = 3;
    else if (def_ataq == 14 || def_ataq == 15) valorSucess = 2;
    else if (def_ataq >= 16) valorSucess = 1;
    else if (def_ataq == -1) valorSucess = 11;
    else if (def_ataq == -2) valorSucess = 12;
    else if (def_ataq == -3) valorSucess = 13;
    else if (def_ataq == -4 || def_ataq == -5) valorSucess = 14;
    else if (def_ataq == -6 || def_ataq == -7) valorSucess = 15;
    else if (def_ataq == -8 || def_ataq == -9) valorSucess = 16;
    else if (def_ataq == -10 || def_ataq == -11) valorSucess = 17;
    else if (def_ataq == -12 || def_ataq == -13) valorSucess = 18;
    else if (def_ataq == -14 || def_ataq == -15) valorSucess = 19;
    else if (def_ataq <= -16) valorSucess = 20;
  }
  const r = new Roll("1d20");
  r.evaluate({async: false});
  const Dresult = r.total;
  if ((Dresult >= valorSucess || Dresult == 20) && Dresult > 1) { // Sucesso
      stringSucesso = "<h1 class='mediaeval rola' style='text-align:center; color: white;background-color:#00a1e8;'>SUCESSO</h1>";
  } else {    // Insucesso
      stringSucesso = "<h1 class='mediaeval rola' style='text-align:center; color: white;background-color:#ff0000;'>FRACASSO</h1>";
  }  
  r.toMessage({
      user: game.user.id,
      speaker: ChatMessage.getSpeaker({ alias: game.user.name }),
      flavor: `<h2 class="mediaeval rola" style="text-align:center;">Teste de Resistência</h2><h3 class="mediaeval rola"> Força Ataque: ${forcAtaque}</h3><h3 class="mediaeval rola">Resistência: ${valorDef}</h3>${stringSucesso}`
  });
}

Hooks.on("renderSidebarTab", async (object, html) => {
  if (object instanceof Settings) {
    const details = html.find("#game-details");
    const tgDetails = document.createElement("li");
    tgDetails.classList.add("donation-sistema");
    tgDetails.innerHTML = "Tagmar RPG no Foundry Vtt <span><a title='Acesse nosso Youtube.' href='https://www.youtube.com/channel/UCDyR_0eg3TjV5r5cOUqQaSQ'><i class='fab fa-youtube-square'></i></a></span>";
    details.append(tgDetails);
  }
});

Hooks.on("renderCombatTracker",function (combatTracker, html) {
  if (game.settings.get('tagmar_rpg', 'popOutCombat')) {
    if (!combatTracker.options.popOut && combatTracker.combats.length > 0) combatTracker.renderPopout();
  }
  if (!game.user.isGM) return;
  const combats = combatTracker.combats;
  if (combats.length > 0) {
    let header = html.find("#combat-round");
    header.append(`<nav class="encounters flexrow">
      <a class="combat-control setarIniciativa" title="Somar Iniciativa para vários combatentes.">
      <i class="fas fa-exchange-alt"></i>
      </a>
    </nav>`);
    let currentCombat = combatTracker.viewed;
    let combatants = currentCombat.combatants;
    $('.setarIniciativa').on('click', function (event) {
      let dialogContent = `<div class="mediaeval">
        <ul class="combatates" style="list-style-type:none;"></ul>
        <label for="valor">Somar na Iniciativa:</label>
        <input type="number" name="valor" id="valor" value="0" style="width:50px;margin-left:10px;text-align:center;margin-bottom:10px;" class="valorIniciativa"/>
      </div>`;
      let dialog = new Dialog({
        title: "Somar Iniciativa",
        content: dialogContent,
        buttons: {
          vai: {
            icon: '<i class="fas fa-check"></i>',
            label: 'Somar Iniciativa',
            callback: html => {
              let valor = html.find('.valorIniciativa').val();
              $(".mudar:checked").each(function (index, c) {
                let combatId = $(c).val();
                let combatante = currentCombat.combatants.find(c => c.id == combatId);
                let iniciativaAtual = combatante.initiative;
                valor = parseInt(valor);
                currentCombat.setInitiative(combatId, parseInt(iniciativaAtual + valor));
              });
            }
          },
          cancel: {
            icon: '<i class="fas fa-times"></i>',
            label: 'Cancelar'
          }
        },
        default: "cancel",
        render: html => {
          combatants.forEach(function (combatant) {
            html.find('.combatates').append(`<li style="margin-bottom:5px;"><input type="checkbox" class="mudar" value="${combatant.id}"/> ${combatant.name}</li>`);
          });
        }
      });
      dialog.render(true);
    });
  }
});

async function createTagmarMacro(data, slot) {
  if (data.type !== "Item") return;
  if (!("data" in data)) return ui.notifications.warn("Você só pode criar Macros para Ataques, Técnicas de Combate, Habilidades e Magias.");
  const item = data.data;
  // const actor = getItemOwner(item);
  // Create the macro command
  const command = `game.tagmar.rollItemMacro("${item.name}");`;

  let macro = game.macros.entities.find(m => (m.name === item.name) && (m.command === command));
  if (!macro) {
    macro = await Macro.create({
      name: item.name,
      type: "script",
      img: item.img,
      command: command,
      flags: {
        "tagmar.itemMacro": true
      }
    });
  }
  game.user.assignHotbarMacro(macro, slot);
  return false;
}

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {string} itemName
 * @return {Promise}
 */
function rollItemMacro(itemName, extra) {
  const speaker = ChatMessage.getSpeaker();
  let actor;
  if (speaker.token) actor = game.actors.tokens[speaker.token];
  if (!actor) actor = game.actors.get(speaker.actor);
  const item = actor ? actor.items.find(i => i.name === itemName && i.type != "Pertence" && i.type != "Transporte" && i.type != "Defesa") : null;
  if (!item) return ui.notifications.warn(`O personagem selecionado não possui um Item chamado ${itemName}`);
  // Trigger the item roll
  return item.rollTagmarItem();
}
