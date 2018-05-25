const EmpresasJSON = require('../empresas-filhas.json');
const TabelaEmpresasJSON = require('../TabelaGeral-empresas-filhas2017.json')
const _ = require('lodash');

module.exports = {
  extractEndpointJSON () {
    const verifyGraduada = item => item.graduada === 'f' ? 'Não' : 'Graduada';
    let newEmpresaJSON = EmpresasJSON.map(item => {
      let empresa = {}
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
  },
  extractExcelJSON () {
    let newEmpresaExcel = TabelaEmpresasJSON.map(item => {
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
  },
  getEmpresas() {
    let empresas = _.merge(this.extractExcelJSON(), this.extractEndpointJSON());
    return empresas
  }
}
