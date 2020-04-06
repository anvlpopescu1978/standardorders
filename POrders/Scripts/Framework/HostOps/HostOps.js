(function () {

    function execute() {

        Type.registerNamespace('Shp.Host');


        Shp.Host.Content = function () {
            throw 'Cannot instantiate Shp.Host.Content static class';
        };

        Shp.Host.Content.get_libraries = function (success, fail) {
            /// <summary>Get document libraries from host</summary>
            /// <param name="success" type="Function" mayBeNull="false" optional="false">Success callback<param>
            /// <param name="fail" type="Function" mayBeNull="false" optional="false">Fail callback</param>
            var e = Function.validateParameters(arguments, [{ name: 'success', type: Function, optional: false, mayBeNull: false },
                { name: 'fail', type: Function, optional: true, mayBeNull: false }], true);
            if (e) throw e;


            var fail = fail || function (err) {
                alert(err);
            }     

            var context = SP.ClientContext.get_current();
            var context2 = context.get_web().get_parentWeb().get_context();
            var oLists = context2.get_web().get_lists();
            context2.load(oLists);
            context2.executeQueryAsync(function () {
                success(oLists);
            }, function (sender, args) {
                fail(args.get_message());
            });
        };


        Shp.Host.Content.registerClass('Shp.Host.Content');
    }


    execute();


})();