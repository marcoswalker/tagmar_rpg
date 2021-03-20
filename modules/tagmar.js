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

  preloadHandlebarsTemplates();
  
});

Hooks.once("ready", async function () {
  // Wait to register hotbar drop hook on ready so that modules could register earlier if they want to
  Hooks.on("hotbarDrop", (bar, data, slot) => createTagmarMacro(data, slot));
});

Hooks.on("createToken", async function(scene, token) {
  if (!token.actorLink) {
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
  }
});

Hooks.on("preCreateToken", function(_scene, data) {
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
            visibility: CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER
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
          visibility: CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER
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
            visibility: CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER
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
          visibility: CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER
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
            visibility: CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER
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
          visibility: CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER
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
            visibility: CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER
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
          visibility: CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER
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
