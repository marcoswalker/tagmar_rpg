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
