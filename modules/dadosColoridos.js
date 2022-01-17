export function dadosColoridos(resultado, roll) {
    switch (resultado) {
        case "verde":
            roll.dice[0].options.appearance = {foreground: "#52cc00", outline: "#000000", font: "FoundryVTT"};
            break;
        case "branco":
            roll.dice[0].options.appearance = {foreground: "#ffffff", outline: "#000000", font: "FoundryVTT"};
            break;
        case "amarelo":
            roll.dice[0].options.appearance = {foreground: "#fff700", outline: "#000000", font: "FoundryVTT"};
            break;
        case "laranja":
            roll.dice[0].options.appearance = {foreground: "#8f4500", outline: "#000000", font: "FoundryVTT"};
            break;
        case "vermelho":
            roll.dice[0].options.appearance = {foreground: "#ff0000", outline: "#ffffff", font: "FoundryVTT"};
            break;
        case "azul":
            roll.dice[0].options.appearance = {foreground: "#00a1e8", outline: "#000000", font: "FoundryVTT"};
            break;
        case "roxo":
            roll.dice[0].options.appearance = {foreground: "#0000ff", outline: "#ffffff", font: "FoundryVTT"};
            break;
        case "cinza":
            roll.dice[0].options.appearance = {foreground: "#525252", outline: "#000000", font: "FoundryVTT"};
            break;
        default:
            break;
    }
};