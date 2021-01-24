/*Classe para configurar opções do sistema*/
export const SystemSettings = function() {

    game.settings.register("tagmar_rpg", "sheetTemplate", {
        name: "Ficha",
        hint: "Opção de imagem de fundo da ficha, padrão ou fundo do livro",
        scope: "user",
        config: true,
        default: "base",
        type: String,
        choices: {
          "base": "Sem Imagem (padrão)",
          "tagmar3": "Fundo do Livro (tagmar 3.0)"
        }
      });

}