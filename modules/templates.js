/**
* Define a set of template paths to pre-load
* Pre-loaded templates are compiled and cached for fast access when rendering
* @return {Promise}
*/
export const preloadHandlebarsTemplates = async function() {
	return loadTemplates([

        "systems/tagmar_rpg/templates/sheets/personagem-sheet.hbs",
        "systems/tagmar_rpg/templates/sheets/npc-sheet.hbs",
        "systems/tagmar_rpg/templates/sheets/inventario-sheet.hbs"
	]);
};