const EmpresasEndpoint = require('./empresas_endpoint.json');
const EmpresasExcel = require('./empresas_excel.json');
const EmpresasWithUsers = require('./empresas_with_users2018.json');
const _ = require('lodash');

function extractEndpointJSON() {
  const verifyGraduada = item => item.graduada === 'f' ? 'Não' : 'Graduada';
  let newEmpresaJSON = EmpresasEndpoint.map(item => {
    let empresa = { status: 'published' }
    empresa.razao_social = item.razao_social;
    empresa.nome = item.nome_fantasia;
    empresa.website = item.site;
    empresa.incubacao = item.incubada === 'f' ? verifyGraduada(item) : 'Incubada';
    empresa.fundada_em = item.ano_fundacao;
    empresa.qtde_funcionarios = item.numero_funcionarios;
    empresa.descricao = item.descricao;
    empresa.area_de_atuacao = item.areas.map(area => area.area_atuacao);
    return empresa
  });
  return newEmpresaJSON
}
function extractExcelJSON() {
  let newEmpresaExcel = EmpresasExcel.map(item => {
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
  })
  return newEmpresaExcel
}

function extractJSONWithUsers() {
  let newEmpresaWithUser = EmpresasWithUsers.map(item => {
    let empresa = {}
    empresa.razao_social = item.razao_social;
    empresa.nome = item.nome_fantasia;
    empresa.cnpj = item.cnpj;
    empresa.nome_fundador = item.nome_fundador
    empresa.email_fundador = item.email_fundador
    return empresa
  })
  return newEmpresaWithUser
}

function mergeJSONs() {
  let empresas = _.merge(extractExcelJSON(), extractEndpointJSON());
  empresas = _.merge(extractJSONWithUsers(), empresas);
  return empresas.filter(empresa => empresa.nome_fundador && empresa.email_fundador)
}

module.exports = {
  'getEmpresasWithUsers': mergeJSONs
}




