import tagmarItemSheet from "./sheets/tagmarItemSheet.js";
import tagmarActorSheet from "./sheets/tagmarActorSheet.js";
import { tagmarItem } from "./tagmarItem.js";
import { preloadHandlebarsTemplates } from "./templates.js";
import { SystemSettings } from "./settings.js";

Hooks.once("init", function(){

  game.tagmar = {
    tagmarItem,
    rollItemMacro
  };

  CONFIG.Combat.initiative = {
    formula: "1d10 + @iniciativa",
    decimals: 2
  };
  CONFIG.Item.entityClass = tagmarItem;
  // Register System Settings
  SystemSettings();
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("tagmar", tagmarItemSheet, {makeDefault: true});

  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("tagmar", tagmarActorSheet, {makeDefault: true});

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
    const a_list = a.split(',');
    const found = a_list.find(element => element == b);
    if (found) {
      return options.fn(this);
    } 
    return options.inverse(this);
  });

  Handlebars.registerHelper('idfind', function (a, b, options) {
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
    return value.toFixed(decimal);
  });

  preloadHandlebarsTemplates();
  
});

Hooks.once("ready", async function () {
  // Wait to register hotbar drop hook on ready so that modules could register earlier if they want to
  Hooks.on("hotbarDrop", (bar, data, slot) => createTagmarMacro(data, slot));
});

Hooks.on("createToken", async function(scene, token) {
  if (!game.user.isGM) return;
  if (!token.actorLink) {
    try {
      let tokenA = canvas.tokens.get(token._id);
      let tokenactor = tokenA.actor;
      await tokenactor.update({
        'name': tokenA.actor.name + " Cópia"
      });
      let actor = await Actor.create(tokenactor);
      tokenA.update({
        'actorId': actor._id,
        'actorLink': true
      });
    } catch (e) {
      ui.notifications.error(e);
    }
  }
});

Hooks.on("preCreateToken", function(_scene, data) {
  if (!game.user.isGM) return;
  const setting = game.settings.get("tagmar_rpg", "autoBars");
  const actor = game.actors.get(data.actorId);
  if (setting == "barra_pers") {
    if (actor.data.type == "Personagem") {
      setProperty(data, "flags.barbrawl.resourceBars", {
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
      });
    }
  } else if (setting == "barra_npc") {
    if (actor.data.type == "NPC") {
      setProperty(data, "flags.barbrawl.resourceBars", {
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
      });
    }
  } else if (setting == "barra_both") {
    if (actor.data.type == "Personagem") {
      setProperty(data, "flags.barbrawl.resourceBars", {
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
      });
    } else if (actor.data.type == "NPC") {
      setProperty(data, "flags.barbrawl.resourceBars", {
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
      });
    }
  }
});

let dragRulerApi;

export function tagmarGetColorForDistance(startDistance, subDistance=0) {
	if (!this.isDragRuler)
		return this.color;
	// Tagmar Changes
  if (!((this.draggedToken.actor.data.type === "Personagem" || this.draggedToken.actor.data.type === "NPC") && game.settings.get('drag-ruler', "alwaysShowSpeedForPCs")))
			return this.color;
	const distance = startDistance + subDistance;
	const ranges = dragRulerApi.getRangesFromSpeedProvider(this.draggedToken);
	if (ranges.length === 0)
		return this.color;
	const currentRange = ranges.reduce((minRange, currentRange) => {
		if (distance <= currentRange.range && currentRange.range < minRange.range)
			return currentRange;
		return minRange;
	}, {range: Infinity, color: dragRulerApi.getUnreachableColorFromSpeedProvider()})
	return currentRange.color;
}

Hooks.once("dragRuler.ready", (SpeedProvider) => {
  import('/modules/drag-ruler/src/api.js')
  .then((module) => {
    dragRulerApi = module;
  });
  dragRuler.getColorForDistance = tagmarGetColorForDistance;
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

Hooks.on('renderChatMessage', function (message, jq, messageData) {
  const fonte_size = game.settings.get('tagmar_rpg', 'fonteMsg');
  const rola_desc = jq.find('.rola_desc');
  if (fonte_size > 0) $(rola_desc).css('font-size', fonte_size.toString()+'%');
  else $(rola_desc).css('font-size', '100%');
});

document.addEventListener('keydown', function (event) {
  const atalhoTarget = game.settings.get("tagmar_rpg", "atalhoTarget");
  if (event.key == atalhoTarget.toLowerCase() || event.key == atalhoTarget.toUpperCase() && game.user.isGM) {
    const hoveredToken = canvas.tokens._hover;
    if (hoveredToken !== null) {
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
      user: game.user._id,
      speaker: ChatMessage.getSpeaker({
          actor: actor
        })
    };
    let target_def = target_token.actor.data.data.d_ativa;
    chatData.content = "<p><img src='"+ actor.img +"' style='float: left; margin-left: auto; margin-right: auto; width: 40%;border: 0px;' /><img src='systems/tagmar_rpg/assets/TAGMAR FOUNDRY.png' style='float: left;margin-top:25px; margin-left: auto; margin-right: auto; width: 20%;border: 0px;'/><img src='"+ target_token.actor.img +"' style='float: left; width: 40%; margin-left: auto; margin-right: auto;border: 0px;' /></p><p class='rola_desc' style='display: block;margin-left:auto;margin-right:auto;margin-top:60%;'>"+ "<b>Agressor: </b>" + actor.data.name + "<br><b>Bônus de Ataque: </b>"+ String(actor.data.data.inf_ataque.bonus) +"<br><b>Oponente: </b>" + target_token.actor.data.name  +"<br><b>Def. Oponente: </b>"+ target_def.categoria + String(target_def.valor) +"</p>";
    ChatMessage.create(chatData);
  }
}

async function createTagmarMacro(data, slot) {
  if (data.type !== "Item") return;
  if (!("data" in data)) return ui.notifications.warn("Você só pode criar Macros para Ataques, Magias e Poderes. Você pode referenciar atributos e perícias com @. Ex.: @for ou @luta");
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
  // console.log(item);
  // Trigger the item roll
  return item.roll(actor, extra);
}
