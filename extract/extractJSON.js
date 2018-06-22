const EmpresasEndpoint = require('./empresas_endpoint.json');
const EmpresasExcel = require('./empresas_excel.json');
const _ = require('lodash');

let jsonEnpoint = extractEndpointJSON();
let jsonExcel = extractExcelJSON();

function extractEndpointJSON() {
  const verifyGraduada = item => item.graduada === 'f' ? 'Não' : 'Graduada';
  return EmpresasEndpoint.map(item => {
    let empresa = { status: 'published' }
    empresa.razao_social = item.razao_social;
    empresa.nome = item.nome_fantasia;
    empresa.website = item.site;
    empresa.incubacao = item.incubada === 'f' ? verifyGraduada(item) : 'Incubada';
    empresa.fundada_em = item.ano_fundacao;
    empresa.qtde_funcionarios = item.numero_funcionarios;
    empresa.descricao = item.descricao;
    empresa.area_de_atuacao = item.areas.map(area => area.area_atuacao);
    empresa.nome_fundador = item.nome_fundador;
    empresa.email_fundador = item.email_fundador;
    empresa.cnpj = item.cnpj;
    return empresa
  });
}
function extractExcelJSON() {
  return EmpresasExcel.map(item => {
    let empresa = {}
    empresa.razao_social = item.razao_social;
    empresa.nome = item.nome;
    empresa.fundada_em = Number(item.fundado_em);
    empresa.email = item.email;
    empresa.qtde_funcionarios = Number(item.qtde_funcionarios);
    empresa.investidor = item.investidor;
    empresa.faturamento = Number(item.faturamento);
    empresa.incubacao = item.incubacao;
    empresa.cidade = item.cidade;
    empresa.estado = item.estado;
    empresa.propriedade_intelectual = item.propriedade_intelectual;
    empresa.colaboracao = item.colaboracao;
    empresa.spinoff = item.spinoff;
    empresa.area_de_atuacao = item.area_de_atuacao.map(area => area);
    return empresa
  });
}

function mergeJSONs() {
  let merge = [];
  jsonEnpoint = _.filter(jsonEnpoint, item => item.email_fundador && item.nome_fundador)
  jsonExcel.forEach(excelItem => {
    let jsonEnpointFiltered = _.filter(jsonEnpoint, endpointItem => excelItem.nome === endpointItem.nome);
    jsonEnpointFiltered.forEach(arrItem => {
      merge.push(_.merge(arrItem, excelItem))
    });
  })
  return merge
}

module.exports = {
  'getEmpresasWithUsers': mergeJSONs
}




