define(
  [
    'angular-mocks',
    'js/app',
    'js/service/name-service'
  ],
  function() {
    describe('NameService', function() {

      beforeEach(module('ng-boilerplate'));

      var nameService;
      beforeEach(inject(function (NameService) {
        nameService = NameService;
      }));

      describe('#formatName()', function() {
        it('should title case a given string', function() {
          expect(nameService.formatName('IAN')).to.equal('Ian');
          expect(nameService.formatName('bill murray')).to.equal('Bill Murray');
        });
      });

    });
  }
);