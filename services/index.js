const JSONs = require('../extract/extractJSON');
const Model = require('../model/index');
const _ = require('lodash');

function mountUser(empresaWithUser) {
  let user = {}
  user.username = user.displayname = user.email = empresaWithUser.email_fundador;
  user.password = 'genova@123';
  user.enabled = true;
  user.roles = '["guest", "everyone"]';
  user.stack = '[]';
  return user
}
function mountFundador(empresaWithUser, user) {
  let fundador = {}
  fundador.nome = empresaWithUser.nome_fundador;
  fundador.email = empresaWithUser.email_fundador;
  fundador.user_id = user.id;
  fundador.status = 'published';
  fundador.senha = user.password;
  fundador.slug = `${empresaWithUser.nome_fundador}-${user.id}`;
  return fundador
}
function mountEmpresa(empresaWithUser) {
  let empresa = {}
  empresa.razao_social = empresaWithUser.razao_social;
  empresa.nome = empresaWithUser.nome;
  empresa.fundada_em = empresaWithUser.fundada_em;
  empresa.email = empresaWithUser.email;
  empresa.qtde_funcionarios = empresaWithUser.qtde_funcionarios;
  empresa.investidor = empresaWithUser.investidor;
  empresa.faturamento = empresaWithUser.faturamento;
  empresa.incubacao = empresaWithUser.incubacao;
  empresa.cidade = empresaWithUser.cidade;
  empresa.estado = empresaWithUser.estado;
  empresa.propriedade_intelectual = empresaWithUser.propriedade_intelectual;
  empresa.colaboracao = empresaWithUser.colaboracao;
  empresa.spinoff = empresaWithUser.spinoff;
  empresa.area_de_atuacao = JSON.stringify(empresaWithUser.area_de_atuacao);
  return empresa
}
function mountRelation(empresa_id, fundador_id) {
  let relation = {}
  relation.from_contenttype = 'fundadores';
  relation.to_contenttype = 'empresas';
  relation.from_id = fundador_id;
  relation.to_id = empresa_id;
  return relation
}
function create() {
  let array = []
  array = JSONs.getEmpresasWithUsers().map(async empresaWithUser => {
    let user = mountUser(empresaWithUser);
    user.id = await Model.Users.create(user);
    let fundador = mountFundador(empresaWithUser, user);
    fundador.id = await Model.Fundadores.create(fundador);
    let empresa = mountEmpresa(empresaWithUser);
    empresa.id = await Model.Empresas.create(empresa);
    let relation = mountRelation(empresa.id, fundador.id);
    relation = await Model.Relations.create(relation);
    
    return await _.merge(_.merge(fundador, user), _.merge(empresa, relation));
  });
  return array
}

module.exports = {
  create
}
