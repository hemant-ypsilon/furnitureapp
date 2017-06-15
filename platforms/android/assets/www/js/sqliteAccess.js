angular.module('starter.saf', [])

.factory('DBA', function($cordovaSQLite, $q, $ionicPlatform) {
  var self = this;

  // Handle query's and potential errors
  self.query = function (query, parameters) {
    parameters = parameters || [];
    var q = $q.defer();

    $ionicPlatform.ready(function () {
        console.log('db' + db);
        console.log('query' + query);
        console.log('parameter' + parameters);

      $cordovaSQLite.execute(db, query, parameters)
        .then(function (result) {
          q.resolve(result);
        }, function (error) {
          console.warn('I found an error');
          console.warn(error);
          q.reject(error);
        });
    });
    return q.promise;
  }

  // Proces a result set
  self.getAll = function(result) {
    var output = [];

    for (var i = 0; i < result.rows.length; i++) {
      output.push(result.rows.item(i));
    }
    return output;
  }

  // Proces a single result
  self.getById = function(result) {
    var output = null;
    output = angular.copy(result.rows.item(0));
    return output;
  }

  return self;
})

.factory('Menu', function($cordovaSQLite, DBA) {
  var self = this;


 // self.color = function() {
 //    return DBA.query("SELECT `id`, `nombre` FROM `ctg_colores` WHERE `estatus` = 1")
 //      .then(function(result){
 //        return DBA.getAll(result);
 //      });
 //  }

 //   self.mechanismo = function() {
 //    return DBA.query("SELECT `id`, `nombre` FROM `ctg_mecanismos` WHERE `estatus` = 1")
 //      .then(function(result){
 //        return DBA.getAll(result);
 //      });
 //  }

 //   self.tapiz = function() {
 //    return DBA.query("SELECT `id`, `nombre` FROM `ctg_tapiz` WHERE `estatus` = 1")
 //      .then(function(result){
 //        return DBA.getAll(result);
 //      });
 //  }


  self.all = function() {
    return DBA.query("SELECT id, name FROM team")
      .then(function(result){
        return DBA.getAll(result);
      });
  }

  self.get = function(table, status) {
    var parameters = [status];
    return DBA.query("SELECT id, nombre FROM ctg_colores WHERE estatus (?)", parameters)
      .then(function(result) {
        return DBA.getById(result);
      });
  }

  self.add = function(table, member) {
    var parameters = [member.id, member.name];
    return DBA.query("INSERT INTO ctg_colores (id, nombre, estatus, fecha_creacion, fecha_modificacion, usuario_creacion, usuario_modificacion) VALUES (?,?)", parameters);
  }

  self.remove = function(member) {
    var parameters = [member.id];
    return DBA.query("DELETE FROM team WHERE id = (?)", parameters);
  }

  self.update = function(origMember, editMember) {
    var parameters = [editMember.id, editMember.name, origMember.id];
    return DBA.query("UPDATE team SET id = (?), name = (?) WHERE id = (?)", parameters);
  }

  return self;
})
    
    
    
    