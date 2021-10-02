export function _preparaCaracRaciais(sheetData, updatePers) {
    if (!sheetData.options.editable) return;
    const actorData = sheetData.actor;
    const racas = actorData.items.filter(item => item.type == "Raca");
    if (racas.length > 1) {
        let ids = [];
        racas.slice(1).forEach(function (item) {
            ids.push(item.id);
        });
        actorData.deleteEmbeddedDocuments("Item", ids);  
    }
    const racaP = racas[0];
    if (racaP) {
        const racaData = racaP.data.data;
        if (actorData.data.raca != racaP.name)
        {
            updatePers['data.raca'] = racaP.name;
            updatePers['data.mod_racial.INT'] = racaData.mod_racial.INT;
            updatePers['data.mod_racial.AUR'] = racaData.mod_racial.AUR;
            updatePers['data.mod_racial.CAR'] = racaData.mod_racial.CAR;
            updatePers['data.mod_racial.FOR'] = racaData.mod_racial.FOR;
            updatePers['data.mod_racial.FIS'] = racaData.mod_racial.FIS;
            updatePers['data.mod_racial.AGI'] = racaData.mod_racial.AGI;
            updatePers['data.mod_racial.PER'] = racaData.mod_racial.PER;
        } 
    }
}

export function _caracSort(data, updatePers) {
    if (!data.options.editable) return;
    const actorData = data.actor.data;
    const sort_INT = actorData.data.carac_sort.INT;
    const sort_AUR = actorData.data.carac_sort.AUR;
    const sort_CAR = actorData.data.carac_sort.CAR;
    const sort_FIS = actorData.data.carac_sort.FIS;
    const sort_FOR = actorData.data.carac_sort.FOR;
    const sort_AGI = actorData.data.carac_sort.AGI;
    const sort_PER = actorData.data.carac_sort.PER;
    let final_INT = sort_INT + actorData.data.mod_racial.INT;
    let final_AUR = sort_AUR + actorData.data.mod_racial.AUR;
    let final_CAR = sort_CAR + actorData.data.mod_racial.CAR;
    let final_FIS = sort_FIS + actorData.data.mod_racial.FIS;
    let final_FOR = sort_FOR + actorData.data.mod_racial.FOR;
    let final_AGI = sort_AGI + actorData.data.mod_racial.AGI;
    let final_PER = sort_PER + actorData.data.mod_racial.PER;
    const final_actor = data.actor.data.data.carac_final;
    if (final_INT != final_actor.INT || final_AUR != final_actor.AUR || final_CAR != final_actor.CAR || final_FIS != final_actor.FIS || final_FOR != final_actor.FOR || final_AGI != final_actor.AGI || final_PER != final_actor.PER) {
        updatePers['data.carac_final.AGI'] = final_AGI;
        updatePers['data.carac_final.AUR'] = final_AUR;
        updatePers['data.carac_final.CAR'] = final_CAR;
        updatePers['data.carac_final.FIS'] = final_FIS;
        updatePers['data.carac_final.FOR'] = final_FOR;
        updatePers['data.carac_final.INT'] = final_INT;
        updatePers['data.carac_final.PER'] = final_PER;
    }
}

export function _calculaAjuste(sheetData, updatePers) {
    if (!sheetData.options.editable) return;
    const actorData = sheetData.actor.data;
    let carac_finalINT = actorData.data.carac_final.INT;
    let carac_finalAUR = actorData.data.carac_final.AUR;
    let carac_finalCAR = actorData.data.carac_final.CAR;
    let carac_finalFOR = actorData.data.carac_final.FOR;
    let carac_finalFIS = actorData.data.carac_final.FIS;
    let carac_finalAGI = actorData.data.carac_final.AGI;
    let carac_finalPER = actorData.data.carac_final.PER;
    if (carac_finalINT > 36) carac_finalINT = 36;
    if (carac_finalAUR > 36) carac_finalAUR = 36;
    if (carac_finalCAR > 36) carac_finalCAR = 36;
    if (carac_finalFOR > 36) carac_finalFOR = 36;
    if (carac_finalFIS > 36) carac_finalFIS = 36;
    if (carac_finalAGI > 36) carac_finalAGI = 36;
    if (carac_finalPER > 36) carac_finalPER = 36;
    if (carac_finalINT < 0) carac_finalINT = 0;
    if (carac_finalAUR < 0) carac_finalAUR = 0;
    if (carac_finalCAR < 0) carac_finalCAR = 0;
    if (carac_finalFOR < 0) carac_finalFOR = 0;
    if (carac_finalFIS < 0) carac_finalFIS = 0;
    if (carac_finalAGI < 0) carac_finalAGI = 0;
    if (carac_finalPER < 0) carac_finalPER = 0;
    let valores = [0,-2,-2,-2,-1,-1,-1,-1,-1,0,0,0,0,1,1,1,2,2,3,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    let somaINT = valores[carac_finalINT];
    let somaAUR = valores[carac_finalAUR];
    let somaCAR = valores[carac_finalCAR];
    let somaFOR = valores[carac_finalFOR];
    let somaFIS = valores[carac_finalFIS];
    let somaAGI = valores[carac_finalAGI];
    let somaPER = valores[carac_finalPER];
    const efeitos = sheetData.actor.items.filter(e => e.type == "Efeito" && ((e.data.data.atributo == "INT" || e.data.data.atributo == "AUR" || e.data.data.atributo == "CAR" || e.data.data.atributo == "FOR" || e.data.data.atributo == "FIS" || e.data.data.atributo == "AGI" || e.data.data.atributo == "PER") && e.data.data.ativo));
    efeitos.forEach(function (efeit) {
        let efeito = efeit.data;
        if (efeito.data.atributo == "INT") {
            if (efeito.data.tipo == "+") {
                somaINT += efeito.data.valor;
            } else if (efeito.data.tipo == "-") {
                somaINT -= efeito.data.valor;
            } else if (efeito.data.tipo == "*") {
                somaINT = somaINT * efeito.data.valor;
            } else if (efeito.data.tipo == "/") {
                somaINT = somaINT / efeito.data.valor;
            }
        } else if (efeito.data.atributo == "AUR") {
            if (efeito.data.tipo == "+") {
                somaAUR += efeito.data.valor;
            } else if (efeito.data.tipo == "-") {
                somaAUR -= efeito.data.valor;
            } else if (efeito.data.tipo == "*") {
                somaAUR = somaAUR * efeito.data.valor;
            } else if (efeito.data.tipo == "/") {
                somaAUR = somaAUR / efeito.data.valor;
            }
        } else if (efeito.data.atributo == "CAR") {
            if (efeito.data.tipo == "+") {
                somaCAR += efeito.data.valor;
            } else if (efeito.data.tipo == "-") {
                somaCAR -= efeito.data.valor;
            } else if (efeito.data.tipo == "*") {
                somaCAR = somaCAR * efeito.data.valor;
            } else if (efeito.data.tipo == "/") {
                somaCAR = somaCAR / efeito.data.valor;
            }
        } else if (efeito.data.atributo == "FOR") {
            if (efeito.data.tipo == "+") {
                somaFOR += efeito.data.valor;
            } else if (efeito.data.tipo == "-") {
                somaFOR -= efeito.data.valor;
            } else if (efeito.data.tipo == "*") {
                somaFOR = somaFOR * efeito.data.valor;
            } else if (efeito.data.tipo == "/") {
                somaFOR = somaFOR / efeito.data.valor;
            }
        } else if (efeito.data.atributo == "FIS") {
            if (efeito.data.tipo == "+") {
                somaFIS += efeito.data.valor;
            } else if (efeito.data.tipo == "-") {
                somaFIS -= efeito.data.valor;
            } else if (efeito.data.tipo == "*") {
                somaFIS = somaFIS * efeito.data.valor;
            } else if (efeito.data.tipo == "/") {
                somaFIS = somaFIS / efeito.data.valor;
            }
        } else if (efeito.data.atributo == "AGI") {
            if (efeito.data.tipo == "+") {
                somaAGI += efeito.data.valor;
            } else if (efeito.data.tipo == "-") {
                somaAGI -= efeito.data.valor;
            } else if (efeito.data.tipo == "*") {
                somaAGI = somaAGI * efeito.data.valor;
            } else if (efeito.data.tipo == "/") {
                somaAGI = somaAGI / efeito.data.valor;
            }
        } else if (efeito.data.atributo == "PER") {
            if (efeito.data.tipo == "+") {
                somaPER += efeito.data.valor;
            } else if (efeito.data.tipo == "-") {
                somaPER -= efeito.data.valor;
            } else if (efeito.data.tipo == "*") {
                somaPER = somaPER * efeito.data.valor;
            } else if (efeito.data.tipo == "/") {
                somaPER = somaPER / efeito.data.valor;
            }
        }
    });
    if (actorData.data.atributos.INT != somaINT) {
        updatePers["data.atributos.INT"] = somaINT;
    }
    if (actorData.data.atributos.AUR != somaAUR) {
        updatePers["data.atributos.AUR"] = somaAUR;
    }
    if (actorData.data.atributos.CAR != somaCAR) {
        updatePers["data.atributos.CAR"] = somaCAR;
    }  
    if (actorData.data.atributos.FOR != somaFOR) {
        updatePers["data.atributos.FOR"] = somaFOR;
    }  
    if (actorData.data.atributos.FIS != somaFIS) {
        updatePers["data.atributos.FIS"] = somaFIS;
    } 
    if (actorData.data.atributos.AGI != somaAGI) {
        updatePers["data.atributos.AGI"] = somaAGI;
    } 
    if (actorData.data.atributos.PER != somaPER) {
        updatePers["data.atributos.PER"] = somaPER;
    } 
}

export function _prepareValorTeste(sheetData, updatePers){
    if (!sheetData.options.editable) return;
    const actorData = sheetData.actor.data;
    if (actorData.data.valor_teste.INT != actorData.data.atributos.INT*4 || actorData.data.valor_teste.AUR != actorData.data.atributos.AUR*4 || actorData.data.valor_teste.CAR != actorData.data.atributos.CAR*4 || actorData.data.valor_teste.FOR != actorData.data.atributos.FOR*4 || actorData.data.valor_teste.FIS != actorData.data.atributos.FIS*4 || actorData.data.valor_teste.AGI != actorData.data.atributos.AGI*4 || actorData.data.valor_teste.PER != actorData.data.atributos.PER*4) {
        updatePers["data.valor_teste.INT"] = actorData.data.atributos.INT*4;
        updatePers["data.valor_teste.AUR"] = actorData.data.atributos.AUR*4;
        updatePers["data.valor_teste.CAR"] = actorData.data.atributos.CAR*4;
        updatePers["data.valor_teste.FOR"] = actorData.data.atributos.FOR*4;
        updatePers["data.valor_teste.FIS"] = actorData.data.atributos.FIS*4;
        updatePers["data.valor_teste.AGI"] = actorData.data.atributos.AGI*4;
        updatePers["data.valor_teste.PER"] = actorData.data.atributos.PER*4;
    }
    if (updatePers.hasOwnProperty("data.atributos.INT")) updatePers["data.valor_teste.INT"] = updatePers["data.atributos.INT"]*4;
    if (updatePers.hasOwnProperty("data.atributos.AUR")) updatePers["data.valor_teste.AUR"] = updatePers["data.atributos.AUR"]*4;
    if (updatePers.hasOwnProperty("data.atributos.CAR")) updatePers["data.valor_teste.CAR"] = updatePers["data.atributos.CAR"]*4;
    if (updatePers.hasOwnProperty("data.atributos.FOR")) updatePers["data.valor_teste.FOR"] = updatePers["data.atributos.FOR"]*4;
    if (updatePers.hasOwnProperty("data.atributos.FIS")) updatePers["data.valor_teste.FIS"] = updatePers["data.atributos.FIS"]*4;
    if (updatePers.hasOwnProperty("data.atributos.AGI")) updatePers["data.valor_teste.AGI"] = updatePers["data.atributos.AGI"]*4;
    if (updatePers.hasOwnProperty("data.atributos.PER")) updatePers["data.valor_teste.PER"] = updatePers["data.atributos.PER"]*4;
    
}

export function _attProfissao(sheetData, updatePers, items_toUpdate) {
    if (!sheetData.options.editable) return;
    const actorData = sheetData.actor;
    const actorSheetData = sheetData.actor.data;
    const profissoes = actorData.items.filter(item => item.type == "Profissao");
    if (profissoes.length > 1) {
        let ids = [];
        profissoes.slice(1).forEach(function (item) {
            ids.push(item.id);
        });
        actorData.deleteEmbeddedDocuments("Item", ids);
    }
    const profissaoP = profissoes[0];
    if (profissaoP) {
        const profissaoData = profissaoP.data;
        const max_hab = profissaoData.data.p_aquisicao.p_hab + Math.floor(actorSheetData.data.estagio / 2);
        const atrib_magia = profissaoData.data.atrib_mag;
        let pontos_hab = profissaoData.data.p_aquisicao.p_hab * actorSheetData.data.estagio;
        const grupo_pen = profissaoData.data.grupo_pen;
        const hab_nata = actorSheetData.data.hab_nata;
        let pontos_tec = profissaoData.data.p_aquisicao.p_tec * actorSheetData.data.estagio;
        let pontos_mag = 0;
        let pontos_gra = profissaoData.data.p_aquisicao.p_gra * actorSheetData.data.estagio;
        let intel = actorSheetData.data.atributos.INT;
        let aura = actorSheetData.data.atributos.AUR;
        let cari = actorSheetData.data.atributos.CAR;
        let forca = actorSheetData.data.atributos.FOR;
        let fisico = actorSheetData.data.atributos.FIS;
        let agilid = actorSheetData.data.atributos.AGI;
        let peric = actorSheetData.data.atributos.PER;
        if (updatePers.hasOwnProperty("data.atributos.INT")) intel = updatePers['data.atributos.INT'];
        if (updatePers.hasOwnProperty("data.atributos.AUR")) aura = updatePers['data.atributos.AUR'];
        if (updatePers.hasOwnProperty("data.atributos.CAR")) cari = updatePers['data.atributos.CAR'];
        if (updatePers.hasOwnProperty("data.atributos.FOR")) forca = updatePers['data.atributos.FOR'];
        if (updatePers.hasOwnProperty("data.atributos.FIS")) fisico = updatePers['data.atributos.FIS'];
        if (updatePers.hasOwnProperty("data.atributos.AGI")) agilid = updatePers['data.atributos.AGI'];
        if (updatePers.hasOwnProperty("data.atributos.PER")) peric = updatePers['data.atributos.PER'];
        if (max_hab != actorSheetData.data.max_hab) {
            updatePers["data.max_hab"] = max_hab;
        }
        if (atrib_magia != "") {
            if (atrib_magia == "INT") pontos_mag = ((2 * intel) + 7) * actorSheetData.data.estagio;
            else if (atrib_magia == "AUR") pontos_mag = ((2 * aura) + 7) * actorSheetData.data.estagio;
            else if (atrib_magia == "CAR") pontos_mag = ((2 * cari) + 7) * actorSheetData.data.estagio;
            else if (atrib_magia == "FOR") pontos_mag = ((2 * forca) + 7) * actorSheetData.data.estagio;
            else if (atrib_magia == "FIS") pontos_mag = ((2 * fisico) + 7)  * actorSheetData.data.estagio;
            else if (atrib_magia == "AGI") pontos_mag = ((2 * agilid) + 7) * actorSheetData.data.estagio;
            else if (atrib_magia == "PER") pontos_mag = ((2 * peric) + 7) * actorSheetData.data.estagio;
        } else pontos_mag = 0;
        const efeitos = sheetData.actor.items.filter(e => e.type == "Efeito" && ((e.data.data.atributo == "PHAB" || e.data.data.atributo == "PTEC" || e.data.data.atributo == "PARM" || e.data.data.atributo == "PMAG") && e.data.data.ativo));
        efeitos.forEach(function(efeit) {
            let efeito = efeit.data;
            if (efeito.data.atributo == "PHAB") {
                if (efeito.data.tipo == "+") {
                    pontos_hab += efeito.data.valor;
                } else if (efeito.data.tipo == "-") {
                    pontos_hab -= efeito.data.valor;
                } else if (efeito.data.tipo == "*") {
                    pontos_hab = pontos_hab * efeito.data.valor;
                } else if (efeito.data.tipo == "/") {
                    pontos_hab = pontos_hab / efeito.data.valor;
                }
            } else if (efeito.data.atributo == "PTEC") {
                if (efeito.data.tipo == "+") {
                    pontos_tec += efeito.data.valor;
                } else if (efeito.data.tipo == "-") {
                    pontos_tec -= efeito.data.valor;
                } else if (efeito.data.tipo == "*") {
                    pontos_tec = pontos_tec * efeito.data.valor;
                } else if (efeito.data.tipo == "/") {
                    pontos_tec = pontos_tec / efeito.data.valor;
                }
            } else if (efeito.data.atributo == "PARM") {
                if (efeito.data.tipo == "+") {
                    pontos_gra += efeito.data.valor;
                } else if (efeito.data.tipo == "-") {
                    pontos_gra -= efeito.data.valor;
                } else if (efeito.data.tipo == "*") {
                    pontos_gra = pontos_gra * efeito.data.valor;
                } else if (efeito.data.tipo == "/") {
                    pontos_gra = pontos_gra / efeito.data.valor;
                }
            } else if (efeito.data.atributo == "PMAG") {
                if (efeito.data.tipo == "+") {
                    pontos_mag += efeito.data.valor;
                } else if (efeito.data.tipo == "-") {
                    pontos_mag -= efeito.data.valor;
                } else if (efeito.data.tipo == "*") {
                    pontos_mag = pontos_mag * efeito.data.valor;
                } else if (efeito.data.tipo == "/") {
                    pontos_mag = pontos_mag / efeito.data.valor;
                }
            }
        });
        if (pontos_gra > 0) {
            pontos_gra -= actorSheetData.data.grupos.CD;
            pontos_gra -= actorSheetData.data.grupos.CI;
            pontos_gra -= actorSheetData.data.grupos.CL;
            pontos_gra -= actorSheetData.data.grupos.CLD;
            pontos_gra -= actorSheetData.data.grupos.EL;
            pontos_gra -= actorSheetData.data.grupos.CmE * 2;
            pontos_gra -= actorSheetData.data.grupos.CmM * 2;
            pontos_gra -= actorSheetData.data.grupos.EM * 2;
            pontos_gra -= actorSheetData.data.grupos.PmA * 2;
            pontos_gra -= actorSheetData.data.grupos.PmL * 2;
            pontos_gra -= actorSheetData.data.grupos.CpE * 3;
            pontos_gra -= actorSheetData.data.grupos.CpM * 3;
            pontos_gra -= actorSheetData.data.grupos.EP * 3;
            pontos_gra -= actorSheetData.data.grupos.PP * 3;
            pontos_gra -= actorSheetData.data.grupos.PpA * 3;
            pontos_gra -= actorSheetData.data.grupos.PpB * 3;

        }
        let tecnicasP = actorData.items.filter(item => item.type == "TecnicasCombate");
        tecnicasP.forEach(function (tecnica) {
            pontos_tec -= tecnica.data.data.custo * tecnica.data.data.nivel;
        });
        let magiasP = actorData.items.filter(item => item.type == "Magia");
        magiasP.forEach(function (magia) {
            pontos_mag -= magia.data.data.custo * magia.data.data.nivel;
        });
        //let hab_updates = [];
        let habilidadesP = actorData.items.filter(item => item.type == "Habilidade");
        habilidadesP.forEach(function (habilidade) {
            let hab_nataD = false;
            if (habilidade.data.data.tipo == grupo_pen) {
                pontos_hab -= (habilidade.data.data.custo + 1) * habilidade.data.data.nivel;
            } else if (habilidade.name == hab_nata) {
                hab_nataD = true;
            } else {
                pontos_hab -= habilidade.data.data.custo * habilidade.data.data.nivel;
            }
            let hab = habilidade.data;
            const atributo = hab.data.ajuste.atributo;
            let hab_nivel = 0;
            let hab_penal = 0;
            let hab_bonus = 0;
            if (hab.data.nivel) hab_nivel = hab.data.nivel;
            if (hab.data.penalidade) hab_penal = hab.data.penalidade;
            if (hab.data.bonus) hab_bonus = hab.data.bonus;
            if (hab_nataD) hab_nivel = actorSheetData.data.estagio;
            let valor_atrib = 0;
            if (atributo == "INT") valor_atrib = intel;
            else if (atributo == "AUR") valor_atrib = aura;
            else if (atributo == "CAR") valor_atrib = cari;
            else if (atributo == "FOR") valor_atrib = forca;
            else if (atributo == "FIS") valor_atrib = fisico;
            else if (atributo == "AGI") valor_atrib = agilid;
            else if (atributo == "PER") valor_atrib = peric;
            let total = 0;
            if (hab_nivel > 0) {
                total = parseInt(valor_atrib) + parseInt(hab_nivel) + parseInt(hab_penal) + parseInt(hab_bonus);
            } else {
                total = parseInt(valor_atrib) - 7 + parseInt(hab_penal) + parseInt(hab_bonus);
            }
            if (hab.data.ajuste.valor != valor_atrib || hab.data.total != total) {
                if (hab_nataD) {
                    items_toUpdate.push({
                        "_id": hab._id,
                        "data.ajuste.valor": valor_atrib,
                        "data.total": total,
                        "data.nivel": actorSheetData.data.estagio
                    }); 
                } else {
                    items_toUpdate.push({
                        "_id": hab._id,
                        "data.ajuste.valor": valor_atrib,
                        "data.total": total
                    });
                }
            }

        });
        if (pontos_hab != actorSheetData.data.pontos_aqui) {
            updatePers["data.pontos_aqui"] = pontos_hab;
        }
        if (pontos_tec != actorSheetData.data.pontos_tec) {
            updatePers["data.pontos_tec"] = pontos_tec;
        }
        if (pontos_gra != actorSheetData.data.pontos_comb) {
            updatePers["data.pontos_comb"] = pontos_gra;
        }
        if (pontos_mag != actorSheetData.data.pontos_mag) {
            updatePers["data.pontos_mag"] = pontos_mag;
        }
        if  (profissaoData.name != actorSheetData.data.profissao) {
            updatePers["data.profissao"] = profissaoData.name;
        }
    }
}

export function _attCargaAbsorcaoDefesa(data, updatePers) {
    if (!data.options.editable) return;
    const actorSheet = data.actor;
    var actor_carga = 0;    // Atualiza Carga e verifica Sobrecarga
    var cap_transp = 0;
    var cap_usada = 0;
    var absorcao = 0;
    var def_pasVal = 0;
    var def_pasCat = "";
    var abs_magica = 0;
    
    if (actorSheet.defesas.length > 0){
        actorSheet.defesas.forEach(function(item){
            let itemData = item.data;
            //actor_carga += item.data.peso;
            absorcao += itemData.data.absorcao;
            def_pasVal += itemData.data.defesa_base.valor;
            if (itemData.data.defesa_base.tipo != ""){
                def_pasCat = itemData.data.defesa_base.tipo;
            }
            abs_magica += itemData.data.peso;
        });
    }
    if (actorSheet.pertences.length > 0){
        actorSheet.pertences.forEach(function(item){
            let itemData = item.data;
            actor_carga += itemData.data.peso * itemData.data.quant;
        });
    }
    if (actorSheet.transportes.length > 0){
        actorSheet.transportes.forEach(function(item){
            let itemData = item.data;
            cap_transp += itemData.data.capacidade.carga;
        });
    }
    if (actorSheet.pertences_transporte.length > 0){
        actorSheet.pertences_transporte.forEach(function(item){
            let itemData = item.data;
            cap_usada += itemData.data.peso * itemData.data.quant;
        });
    }
    let agilidade = data.actor.data.data.atributos.AGI;
    if (updatePers.hasOwnProperty('data.atributos.AGI')) agilidade = updatePers['data.atributos.AGI'];
    var def_atiVal = def_pasVal + agilidade;
    const efeitos = data.actor.items.filter(e => e.type == "Efeito" && ((e.data.data.atributo == "DEF" || e.data.data.atributo == "ABS") && e.data.data.ativo));
    efeitos.forEach(function (efeit){
        let efeito = efeit.data;
        if (efeito.data.atributo == "DEF") {
            if (efeito.data.tipo == "+") {
                def_pasVal += efeito.data.valor;
                def_atiVal += efeito.data.valor;
            } else if (efeito.data.tipo == "-") {
                def_pasVal -= efeito.data.valor;
                def_atiVal -= efeito.data.valor;
            } else if (efeito.data.tipo == "*") {
                def_pasVal = def_pasVal * efeito.data.valor;
                def_atiVal = def_atiVal * efeito.data.valor;
            } else if (efeito.data.tipo == "/") {
                def_pasVal = def_pasVal / efeito.data.valor;
                def_atiVal = def_atiVal / efeito.data.valor;
            }
        } else if (efeito.data.atributo == "ABS") {
            if (efeito.data.tipo == "+") {
                absorcao += efeito.data.valor;
            } else if (efeito.data.tipo == "-") {
                absorcao -= efeito.data.valor;
            } else if (efeito.data.tipo == "*") {
                absorcao = absorcao * efeito.data.valor;
            } else if (efeito.data.tipo == "/") {
                absorcao = absorcao / efeito.data.valor;
            }
        }
    });
    const actorData = data.actor.data.data;
    const actorSheetData = actorSheet.data;
    if (abs_magica > 0) abs_magica = 1;
    if (actorData.d_passiva.valor != def_pasVal || actorData.d_passiva.categoria != def_pasCat || actorData.d_ativa.categoria != def_pasCat || actorData.d_ativa.valor != def_atiVal || actorData.carga_transp.value != cap_usada || actorData.carga_transp.max != cap_transp || actorData.carga.value != actor_carga || actorData.absorcao.max != absorcao || actorData.v_base != abs_magica) {
        updatePers["data.d_passiva.valor"] = def_pasVal;
        updatePers["data.d_passiva.categoria"] = def_pasCat;
        updatePers["data.d_ativa.categoria"] = def_pasCat;
        updatePers["data.d_ativa.valor"] = def_atiVal;
        updatePers["data.carga_transp.value"] = cap_usada;
        updatePers["data.carga_transp.max"] = cap_transp;
        updatePers["data.carga.value"] = actor_carga;
        updatePers["data.absorcao.max"] = absorcao;
        updatePers['data.v_base'] = abs_magica;
    }
    if (cap_transp > 0 && cap_usada < cap_transp) {
        if (!actorData.carga_transp.hasTransp) {
            updatePers["data.carga_transp.hasTransp"] = true;
        }
    } else {
        if (actorData.carga_transp.hasTransp) {
            updatePers["data.carga_transp.hasTransp"] = false;
        }
    }
    let carga_max = 0;
    let forca = actorSheetData.data.atributos.FOR;
    if (updatePers.hasOwnProperty('data.atributos.FOR')) forca = updatePers['data.atributos.FOR'];
    if (forca >= 1) {
        carga_max = (forca * 20) + 20;
        if (actorSheetData.data.carga.value > carga_max) {
            if (!actorData.carga.sobrecarga || actorData.carga.valor_s != actorSheetData.data.carga.value - carga_max) {
                updatePers["data.carga.sobrecarga"] = true;
                updatePers["data.carga.valor_s"] = actorSheetData.data.carga.value - carga_max;
            }
        } else {
            if (actorData.carga.sobrecarga || actorData.carga.valor_s != 0) {
                updatePers["data.carga.sobrecarga"] = false;
                updatePers["data.carga.valor_s"] = 0;
            }
        }
    } else {
        carga_max = 20;
        if (actorSheetData.data.carga.value > carga_max) {
            if (!actorData.carga.sobrecarga || actorData.carga.valor_s != actorSheetData.data.carga.value - carga_max) {
                updatePers["data.carga.sobrecarga"] = true;
                updatePers["data.carga.valor_s"] = actorSheetData.data.carga.value - carga_max;
            }
        } else {
            if (actorData.carga.sobrecarga || actorData.carga.valor_s != 0) {
                updatePers["data.carga.sobrecarga"] = false;
                updatePers["data.carga.valor_s"] = 0;
            }
        }
    }
}

export function _attEfEhVB(data, updatePers) {
    if (!data.options.editable) return;
    let ef_base = 0;
    let vb_base = 0;
    let eh_base = 0;
    const racaP = data.actor.items.filter(item => item.type == "Raca")[0];
    const profP = data.actor.items.filter(item => item.type == "Profissao")[0];
    ef_base = racaP.data.data.ef_base;
    vb_base = racaP.data.data.vb;
    eh_base = profP.data.data.eh_base;
    let forca = data.actor.data.data.atributos.FOR;
    let fisico = data.actor.data.data.atributos.FIS;
    if (updatePers.hasOwnProperty("data.atributos.FOR")) forca = updatePers['data.atributos.FOR'];
    if (updatePers.hasOwnProperty('data.atributos.FIS')) fisico = updatePers['data.atributos.FIS'];
    let efMax = forca + fisico + ef_base;
    let vbTotal = fisico + vb_base;
    const efeitos = data.actor.items.filter(e => e.type == "Efeito" && ((e.data.data.atributo == "VB" || e.data.data.atributo == "EF") && e.data.data.ativo));
    efeitos.forEach(function (efeit) {
        let efeito = efeit.data;
        if (efeito.data.atributo == "VB") {
            if (efeito.data.tipo == "+") {
                vbTotal += efeito.data.valor;
            } else if (efeito.data.tipo == "-") {
                vbTotal -= efeito.data.valor;
            } else if (efeito.data.tipo == "*") {
                vbTotal = vbTotal * efeito.data.valor;
            } else if (efeito.data.tipo == "/") {
                vbTotal = vbTotal / efeito.data.valor;
            }
        } else if (efeito.data.atributo == "EF") {
            if (efeito.data.tipo == "+") {
                efMax += efeito.data.valor;
            } else if (efeito.data.tipo == "-") {
                efMax -= efeito.data.valor;
            } else if (efeito.data.tipo == "*") {
                efMax = efMax * efeito.data.valor;
            } else if (efeito.data.tipo == "/") {
                efMax = efMax / efeito.data.valor;
            }
        }
    });
    if (data.actor.data.data.ef.max != efMax || data.actor.data.data.vb != vbTotal) {
        updatePers["data.ef.max"] = efMax;
        updatePers["data.vb"] = vbTotal
    }
    if (data.actor.data.data.estagio == 1){
        let ehMax = eh_base + fisico;
        if (data.actor.data.data.eh.max != ehMax) {
            updatePers["data.eh.max"] = ehMax;
        }
    }
}

export function _attProximoEstag(data, updatePers) {
    if (!data.options.editable) return;
    let estagio_atual = data.actor.data.data.estagio;
    let prox_est = [0, 11, 21, 31, 46, 61, 76, 96, 116, 136, 166, 196, 226 , 266, 306, 346, 386, 436, 486, 536, 586, 646, 706, 766, 826, 896, 966, 1036, 1106, 1186, 1266, 
        1346, 1426, 1516, 1606, 1696, 1786, 1886, 1986, 2086];
    if (estagio_atual < 40 && data.actor.data.data.pontos_estagio.next != prox_est[estagio_atual]) {
        updatePers["data.pontos_estagio.next"] = prox_est[estagio_atual];
    }
}

export function _attKarmaMax(data, updatePers) {
    if (!data.options.editable) return;
    let aura = data.actor.data.data.atributos.AUR;
    if (updatePers.hasOwnProperty('data.atributos.AUR')) aura = updatePers['data.atributos.AUR'];
    let karma = ((aura) + 1 ) * ((data.actor.data.data.estagio) + 1);
    if (karma < 0) karma = 0;
    const efeitos = data.actor.items.filter(e => e.type == "Efeito" && (e.data.data.atributo == "KMA" && e.data.data.ativo));
    efeitos.forEach(function(efeit) {
        let efeito = efeit.data;
        if (efeito.data.tipo == "+") {
            karma += efeito.data.valor;
        } else if (efeito.data.tipo == "-") {
            karma -= efeito.data.valor;
        } else if (efeito.data.tipo == "*") {
            karma = karma * efeito.data.valor;
        } else if (efeito.data.tipo == "/") {
            karma = karma / efeito.data.valor;
        }
    });
    if (data.actor.data.data.karma.max != karma) {
        updatePers["data.karma.max"] = karma;
    }
}

export function _attRM(data, updatePers) {
    if (!data.options.editable) return;
    let aura = data.actor.data.data.atributos.AUR;
    if (updatePers.hasOwnProperty('data.atributos.AUR')) aura = updatePers["data.atributos.AUR"];
    let rm = data.actor.data.data.estagio + aura;
    const efeitos = data.actor.items.filter(e => e.type == "Efeito" && (e.data.data.atributo == "RMAG" && e.data.data.ativo));
    efeitos.forEach(function(efeit) {
        let efeito = efeit.data;
        if (efeito.data.tipo == "+") {
            rm += efeito.data.valor;
        } else if (efeito.data.tipo == "-") {
            rm -= efeito.data.valor;
        } else if (efeito.data.tipo == "*") {
            rm = rm * efeito.data.valor;
        } else if (efeito.data.tipo == "/") {
            rm = rm / efeito.data.valor;
        }
    });
    if (data.actor.data.data.rm != rm) {
        updatePers["data.rm"] = rm;
    }
}

export function _attRF(data, updatePers) {
    if (!data.options.editable) return;
    let fisico = data.actor.data.data.atributos.FIS;
    if (updatePers.hasOwnProperty('data.atributos.FIS')) fisico = updatePers['data.atributos.FIS'];
    let rf = data.actor.data.data.estagio + fisico;
    const efeitos = data.actor.items.filter(e => e.type == "Efeito" && (e.data.data.atributo == "RFIS" && e.data.data.ativo));
    efeitos.forEach(function(efeit) {
        let efeito = efeit.data;
        if (efeito.data.tipo == "+") {
            rf += efeito.data.valor;
        } else if (efeito.data.tipo == "-") {
            rf -= efeito.data.valor;
        } else if (efeito.data.tipo == "/") {
            rf = rf / efeito.data.valor;
        } else if (efeito.data.tipo == "*") {
            rf = rf * efeito.data.valor;
        }
    });
    if (data.actor.data.data.rf != rf) {
        updatePers["data.rf"] = rf;
    } 
}

export function _updateHabilItems(sheetData, updateItemsNpc) {
    if (!sheetData.options.editable) return;
    const actorData = sheetData.actor.data;
    const habilidades = sheetData.actor.items.filter(item => item.type == "Habilidade");
    for (let habilidade of habilidades) {
        let hab = habilidade.data;
        const atributo = hab.data.ajuste.atributo;
        let hab_nivel = 0;
        let hab_penal = 0;
        let hab_bonus = 0;
        if (hab.data.nivel) hab_nivel = hab.data.nivel;
        if (hab.data.penalidade) hab_penal = hab.data.penalidade;
        if (hab.data.bonus) hab_bonus = hab.data.bonus;
        let valor_atrib = 0;
        if (atributo == "INT") valor_atrib = actorData.data.atributos.INT;
        else if (atributo == "AUR") valor_atrib = actorData.data.atributos.AUR;
        else if (atributo == "CAR") valor_atrib = actorData.data.atributos.CAR;
        else if (atributo == "FOR") valor_atrib = actorData.data.atributos.FOR;
        else if (atributo == "FIS") valor_atrib = actorData.data.atributos.FIS;
        else if (atributo == "AGI") valor_atrib = actorData.data.atributos.AGI;
        else if (atributo == "PER") valor_atrib = actorData.data.atributos.PER;
        let total = 0;
        if (hab_nivel > 0) {
            total = parseInt(valor_atrib) + parseInt(hab_nivel) + parseInt(hab_penal) + parseInt(hab_bonus);
        } else {
            total = parseInt(valor_atrib) - 7 + parseInt(hab_penal) + parseInt(hab_bonus);
        }
        if (hab.data.ajuste.valor != valor_atrib || hab.data.total != total) {
            updateItemsNpc.push({
                "_id": hab._id,
                "data.ajuste.valor": valor_atrib,
                "data.total": total
            });
        }
    }
}

export function _updateTencnicasItems(sheetData, items_toUpdate) {
    if (!sheetData.options.editable) return;
    const actorData = sheetData.actor.data;
    const tecnicas = sheetData.actor.items.filter(item => item.type == "TecnicasCombate");
    //let update_tecnicas = [];
    tecnicas.forEach(function(tecnica) {
        let tec = tecnica.data;
        const ajusteTecnica = tec.data.ajuste;
        const nivel_tecnica = tec.data.nivel;
        let total = 0;
        if (ajusteTecnica.atributo == "INT") total = actorData.data.atributos.INT + nivel_tecnica;
        else if (ajusteTecnica.atributo == "CAR") total = actorData.data.atributos.CAR + nivel_tecnica;
        else if (ajusteTecnica.atributo == "AUR") total = actorData.data.atributos.AUR + nivel_tecnica;
        else if (ajusteTecnica.atributo == "FOR") total = actorData.data.atributos.FOR + nivel_tecnica;
        else if (ajusteTecnica.atributo == "FIS") total = actorData.data.atributos.FIS + nivel_tecnica;
        else if (ajusteTecnica.atributo == "AGI") total = actorData.data.atributos.AGI + nivel_tecnica;
        else if (ajusteTecnica.atributo == "PER") total = actorData.data.atributos.PER + nivel_tecnica;
        else total = nivel_tecnica;
        total += ajusteTecnica.valor;
        if (tec.data.total != total) {
            items_toUpdate.push({
                "_id": tec._id,
                "data.total": total
            });
        }
    });
    /*if (update_tecnicas.length > 0) {
        sheetData.actor.updateEmbeddedDocuments("Item", update_tecnicas);
    }*/
}

export function _updateMagiasItems(sheetData, items_toUpdate) {
    if (!sheetData.options.editable) return;
    const actorData = sheetData.actor.data;
    const magias = sheetData.actor.items.filter(item => item.type == "Magia");
    //let update_magias = [];
    magias.forEach(function (magia) {
        let mag = magia.data;
        const aura = actorData.data.atributos.AUR;
        const m_nivel = mag.data.nivel;
        const m_karma = mag.data.total.valorKarma;
        let total = aura + m_nivel + m_karma;
        if (mag.data.total.valor != total) {
            items_toUpdate.push({
                "_id": mag._id,
                "data.total.valor": total
            });
        }
    });
    /*if (update_magias.length > 0) {
        sheetData.actor.updateEmbeddedDocuments("Item", update_magias);
    }*/
}

export function _updateCombatItems(sheetData, items_toUpdate) {
    if (!sheetData.options.editable) return;
    const actorData = sheetData.actor.data;
    const combates = sheetData.actor.items.filter(item => item.type == "Combate");
    //let comb_updates = [];
    combates.forEach(function (combs) {
        let comb = combs.data;
        let nivel_comb = 0;
        const bonus_magico = comb.data.bonus_magico;
        const bonus_danomais = comb.data.peso;
        const bonus_dano = comb.data.bonus_dano;
        const bonus = comb.data.bonus;
        let bonus_normal = 0;
        let bonus_valor = 0;
        if (bonus_dano == "AUR") bonus_valor = actorData.data.atributos.AUR;
        else if (bonus_dano == "FOR") bonus_valor = actorData.data.atributos.FOR;
        else if (bonus_dano == "AGI") bonus_valor = actorData.data.atributos.AGI;
        else if (bonus_dano == "PER") bonus_valor = actorData.data.atributos.PER;
        if (bonus == "AUR") bonus_normal = actorData.data.atributos.AUR;
        else if (bonus == "FOR") bonus_normal = actorData.data.atributos.FOR;
        else if (bonus == "AGI") bonus_normal = actorData.data.atributos.AGI;
        else if (bonus == "PER") bonus_normal = actorData.data.atributos.PER;
        const p_25 = comb.data.dano_base.d25;
        const p_50 = comb.data.dano_base.d50;
        const p_75 = comb.data.dano_base.d75;
        const p_100 = comb.data.dano_base.d100;
        const p_125 = comb.data.dano_base.d125;
        const p_150 = comb.data.dano_base.d150;
        const p_175 = comb.data.dano_base.d175;
        const p_200 = comb.data.dano_base.d200;
        const p_225 = comb.data.dano_base.d225;
        const p_250 = comb.data.dano_base.d250;
        const p_275 = comb.data.dano_base.d275;
        const p_300 = comb.data.dano_base.d300;
        if (comb.data.tipo == "CD") {
            nivel_comb = actorData.data.grupos.CD;
        }
        else if (comb.data.tipo == "CI") {
            nivel_comb = actorData.data.grupos.CI;
        }
        else if (comb.data.tipo == "CL") {
            nivel_comb = actorData.data.grupos.CL;
        }
        else if (comb.data.tipo == "CLD") {
            nivel_comb = actorData.data.grupos.CLD;
        }
        else if (comb.data.tipo == "EL") {
            nivel_comb = actorData.data.grupos.EL;
        }
        else if (comb.data.tipo == "CmE") {
            nivel_comb = actorData.data.grupos.CmE;
        }
        else if (comb.data.tipo == "CmM") {
            nivel_comb = actorData.data.grupos.CmM;
        }
        else if (comb.data.tipo == "EM") {
            nivel_comb = actorData.data.grupos.EM;
        }
        else if (comb.data.tipo == "PmA") {
            nivel_comb = actorData.data.grupos.PmA;
        }
        else if (comb.data.tipo == "PmL") {
            nivel_comb = actorData.data.grupos.PmL;
        }
        else if (comb.data.tipo == "CpE") {
            nivel_comb = actorData.data.grupos.CpE;
        }
        else if (comb.data.tipo == "CpM") {
            nivel_comb = actorData.data.grupos.CpM;
        }
        else if (comb.data.tipo == "EP") {
            nivel_comb = actorData.data.grupos.EP;
        }
        else if (comb.data.tipo == "PP") {
            nivel_comb = actorData.data.grupos.PP;
        }
        else if (comb.data.tipo == "PpA") {
            nivel_comb = actorData.data.grupos.PpA;
        }
        else if (comb.data.tipo == "PpB") {
            nivel_comb = actorData.data.grupos.PpB;
        }
        else if (comb.data.tipo == "") {
            nivel_comb = comb.data.nivel;
        } 
        else if (comb.data.tipo == "MAG") {
            nivel_comb = comb.data.nivel;
        }
        if (comb.data.nivel != nivel_comb || comb.data.dano.d25 != (p_25 + bonus_valor + bonus_danomais) || comb.data.custo != bonus_normal) {
            items_toUpdate.push({
                '_id': comb._id,
                'data.nivel': nivel_comb,
                "data.dano.d25": p_25 + bonus_valor + bonus_danomais,
                "data.dano.d50": p_50 + bonus_valor + bonus_danomais,
                "data.dano.d75": p_75 + bonus_valor + bonus_danomais,
                "data.dano.d100": p_100 + bonus_valor + bonus_danomais,
                "data.dano.d125": p_125 + bonus_valor + bonus_danomais,
                "data.dano.d150": p_150 + bonus_valor + bonus_danomais,
                "data.dano.d175": p_175 + bonus_valor + bonus_danomais,
                "data.dano.d200": p_200 + bonus_valor + bonus_danomais,
                "data.dano.d225": p_225 + bonus_valor + bonus_danomais,
                "data.dano.d250": p_250 + bonus_valor + bonus_danomais,
                "data.dano.d275": p_275 + bonus_valor + bonus_danomais,
                "data.dano.d300": p_300 + bonus_valor + bonus_danomais,
                'data.custo': bonus_normal
            });
        }
    });
    /*if (comb_updates.length > 0) {
        sheetData.actor.updateEmbeddedDocuments("Item", comb_updates);
    }*/
}

export function _attDefesaNPC(data, updateNpc) {
    if (!data.options.editable) return;
    var absorcao = 0;
    var def_pasVal = 0;
    var def_pasCat = "";
    data.actor.defesas.forEach(function(itemd){
        let item = itemd.data;
        absorcao += item.data.absorcao;
        def_pasVal += item.data.defesa_base.valor;
        if (item.data.defesa_base.tipo != ""){
            def_pasCat = item.data.defesa_base.tipo;
        }
    });
    let agilidade = data.actor.data.data.atributos.AGI;
    if (updateNpc.hasOwnProperty('data.atributos.AGI')) agilidade = updateNpc['data.atributos.AGI'];
    var def_atiVal = def_pasVal + agilidade;
    const actorData = data.actor.data.data;
    if (actorData.d_passiva.valor != def_pasVal || actorData.d_passiva.categoria != def_pasCat || actorData.d_ativa.categoria != def_pasCat || actorData.d_ativa.valor != def_atiVal || actorData.absorcao.max != absorcao) {
        updateNpc["data.d_passiva.valor"] = def_pasVal;
        updateNpc["data.d_passiva.categoria"] = def_pasCat;
        updateNpc["data.d_ativa.categoria"] = def_pasCat;
        updateNpc["data.d_ativa.valor"] = def_atiVal;
        updateNpc["data.absorcao.max"] = absorcao;
    }
}

function somaPontos(atributo) {
    if (atributo <= -1) {
        return (atributo/2);
    } else if (atributo == 0) {
        return 0;
    } else if (atributo == 1) {
        return 1;
    } else if (atributo > 1) {
        return atributo + somaPontos(atributo - 1);
    }
}

export function _setPontosRaca(sheetData, updatePers){ // Função Apenas para ficha Alternativa
    if (!sheetData.options.editable) return;
    const actorData = sheetData.actor.data;
    const raca = actorData.data.raca;
    const estagio = actorData.data.estagio;
    let pontos = 14;
    let g_int = 0;
    let g_aur = 0;
    let g_car = 0;
    let g_for = 0;
    let g_fis = 0;
    let g_agi = 0;
    let g_per = 0;
    if (raca === "Humano") pontos = 15;

    for (let x = 0; x <= estagio; x++) {
        if ((x % 2) != 0) pontos += 1;
    }

    if ((actorData.data.atributos.INT > actorData.data.mod_racial.INT) && (actorData.data.mod_racial.INT > 0)) { 
        pontos -= somaPontos(actorData.data.atributos.INT) - somaPontos(actorData.data.mod_racial.INT);
        g_int = somaPontos(actorData.data.atributos.INT) - somaPontos(actorData.data.mod_racial.INT);
    } else if ((actorData.data.atributos.INT > actorData.data.mod_racial.INT) && (actorData.data.mod_racial.INT < 0)) {
        pontos -= (somaPontos(actorData.data.atributos.INT) - actorData.data.mod_racial.INT);
        g_int = (somaPontos(actorData.data.atributos.INT) - actorData.data.mod_racial.INT);
    } else {
        pontos -= somaPontos(actorData.data.atributos.INT - actorData.data.mod_racial.INT);
        g_int = somaPontos(actorData.data.atributos.INT - actorData.data.mod_racial.INT);
    }

    if ((actorData.data.atributos.AUR > actorData.data.mod_racial.AUR) && (actorData.data.mod_racial.AUR > 0)) {
        pontos -= somaPontos(actorData.data.atributos.AUR) - somaPontos(actorData.data.mod_racial.AUR);
        g_aur = somaPontos(actorData.data.atributos.AUR) - somaPontos(actorData.data.mod_racial.AUR);
    } else if ((actorData.data.atributos.AUR > actorData.data.mod_racial.AUR) && (actorData.data.mod_racial.AUR < 0)) {
        pontos -= (somaPontos(actorData.data.atributos.AUR) - actorData.data.mod_racial.AUR);
        g_aur = (somaPontos(actorData.data.atributos.AUR) - actorData.data.mod_racial.AUR);
    } else {
        pontos -= somaPontos(actorData.data.atributos.AUR - actorData.data.mod_racial.AUR);
        g_aur = somaPontos(actorData.data.atributos.AUR - actorData.data.mod_racial.AUR);
    }

    if ((actorData.data.atributos.CAR > actorData.data.mod_racial.CAR) && (actorData.data.mod_racial.CAR > 0)) {
        pontos -= somaPontos(actorData.data.atributos.CAR) - somaPontos(actorData.data.mod_racial.CAR);
        g_car = somaPontos(actorData.data.atributos.CAR) - somaPontos(actorData.data.mod_racial.CAR);
    } else if ((actorData.data.atributos.CAR > actorData.data.mod_racial.CAR) && (actorData.data.mod_racial.CAR < 0)) {
        pontos -= (somaPontos(actorData.data.atributos.CAR) - actorData.data.mod_racial.CAR);
        g_car = (somaPontos(actorData.data.atributos.CAR) - actorData.data.mod_racial.CAR);
    } else {
        pontos -= somaPontos(actorData.data.atributos.CAR - actorData.data.mod_racial.CAR);
        g_car = somaPontos(actorData.data.atributos.CAR - actorData.data.mod_racial.CAR);
    }

    if ((actorData.data.atributos.FOR > actorData.data.mod_racial.FOR) && (actorData.data.mod_racial.FOR > 0)) {
        pontos -= somaPontos(actorData.data.atributos.FOR) - somaPontos(actorData.data.mod_racial.FOR);
        g_for = somaPontos(actorData.data.atributos.FOR) - somaPontos(actorData.data.mod_racial.FOR);
    } else if ((actorData.data.atributos.FOR > actorData.data.mod_racial.FOR) && (actorData.data.mod_racial.FOR < 0)) {
        pontos -= (somaPontos(actorData.data.atributos.FOR) - actorData.data.mod_racial.FOR);
        g_for = (somaPontos(actorData.data.atributos.FOR) - actorData.data.mod_racial.FOR);
    } else {
        pontos -= somaPontos(actorData.data.atributos.FOR - actorData.data.mod_racial.FOR);
        g_for = somaPontos(actorData.data.atributos.FOR - actorData.data.mod_racial.FOR);
    }

    if ((actorData.data.atributos.FIS > actorData.data.mod_racial.FIS) && (actorData.data.mod_racial.FIS > 0)) {
        pontos -= somaPontos(actorData.data.atributos.FIS) - somaPontos(actorData.data.mod_racial.FIS);
        g_fis = somaPontos(actorData.data.atributos.FIS) - somaPontos(actorData.data.mod_racial.FIS);
    } else if ((actorData.data.atributos.FIS > actorData.data.mod_racial.FIS) && (actorData.data.mod_racial.FIS < 0)) {
        pontos -= (somaPontos(actorData.data.atributos.FIS) - actorData.data.mod_racial.FIS);
        g_fis = (somaPontos(actorData.data.atributos.FIS) - actorData.data.mod_racial.FIS);
    } else {
        pontos -= somaPontos(actorData.data.atributos.FIS - actorData.data.mod_racial.FIS);
        g_fis = somaPontos(actorData.data.atributos.FIS - actorData.data.mod_racial.FIS);
    }

    if ((actorData.data.atributos.AGI > actorData.data.mod_racial.AGI) && (actorData.data.mod_racial.AGI > 0)) {
        pontos -= somaPontos(actorData.data.atributos.AGI) - somaPontos(actorData.data.mod_racial.AGI);
        g_agi = somaPontos(actorData.data.atributos.AGI) - somaPontos(actorData.data.mod_racial.AGI);
    } else if ((actorData.data.atributos.AGI > actorData.data.mod_racial.AGI) && (actorData.data.mod_racial.AGI < 0)) {
        pontos -= (somaPontos(actorData.data.atributos.AGI) - actorData.data.mod_racial.AGI);
        g_agi = (somaPontos(actorData.data.atributos.AGI) - actorData.data.mod_racial.AGI);
    } else {
        pontos -= somaPontos(actorData.data.atributos.AGI - actorData.data.mod_racial.AGI);
        g_agi = somaPontos(actorData.data.atributos.AGI - actorData.data.mod_racial.AGI);
    }

    if ((actorData.data.atributos.PER > actorData.data.mod_racial.PER) && (actorData.data.mod_racial.PER > 0)) {
        pontos -= somaPontos(actorData.data.atributos.PER) - somaPontos(actorData.data.mod_racial.PER);
        g_per = somaPontos(actorData.data.atributos.PER) - somaPontos(actorData.data.mod_racial.PER);
    } else if ((actorData.data.atributos.PER > actorData.data.mod_racial.PER) && (actorData.data.mod_racial.PER < 0)) {
        pontos -= (somaPontos(actorData.data.atributos.PER) - actorData.data.mod_racial.PER);
        g_per = (somaPontos(actorData.data.atributos.PER) - actorData.data.mod_racial.PER);
    } else {
        pontos -= somaPontos(actorData.data.atributos.PER - actorData.data.mod_racial.PER);
        g_per = somaPontos(actorData.data.atributos.PER - actorData.data.mod_racial.PER);
    }
    
    if (pontos != actorData.data.carac_final.INT) {
        updatePers['data.carac_final.INT'] = pontos;
        updatePers['data.carac_sort.INT'] = g_int;
        updatePers['data.carac_sort.AUR'] = g_aur;
        updatePers['data.carac_sort.CAR'] = g_car;
        updatePers['data.carac_sort.FOR'] = g_for;
        updatePers['data.carac_sort.FIS'] = g_fis;
        updatePers['data.carac_sort.AGI'] = g_agi;
        updatePers['data.carac_sort.PER'] = g_per;
    }
}