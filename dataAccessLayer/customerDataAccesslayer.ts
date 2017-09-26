var models = require('../sequelizer/models/index');
var uuid = require('node-uuid');
import response = require('../dataAccessLayer/dataAccessLayerResponse');
import DTO = require('./DTO/CustomerDTO');

var sequelize = models.sequelize;



export function createUser(argUserDTO: DTO.CustomerDTO, successcallback, errorcallback) {
    try {
        sequelize.transaction({ autocommit: false }, function (t) {
            return models.user.create({
                id: uuid.v1(),
                username: argUserDTO.username,
                password: argUserDTO.password,
                email: argUserDTO.email,
                usertype: 'LC',
                usercomment: argUserDTO.usercomment,
            }).then(function (inserteduser) {
                // Transaction has been committed
                // result is whatever the result of the promise chain returned to the transaction callback is
                var dalResponse: response.DataAccessLayerResponse<string> = new response.DataAccessLayerResponse<string>();
                dalResponse.SetSuccessResult(inserteduser.id);
                successcallback(dalResponse);
            }).catch(function (err) {
                // Transaction has been rolled back
                // err is whatever rejected the promise chain returned to the transaction callback is
                var dalResponse: response.DataAccessLayerResponse<string> = new response.DataAccessLayerResponse<string>();
                dalResponse.AddErrorDescription(-1, err)
                errorcallback(dalResponse);
            });
        });
    }
    catch (Exeception) {
        var dalResponse: response.DataAccessLayerResponse<string> = new response.DataAccessLayerResponse<string>();
        dalResponse.AddErrorDescription(-1, Exeception)
        errorcallback(dalResponse);
    }


}

export function createUserEx(argCustomerDTO: DTO.CustomerDTO, successcallback, errorcallback) {
    try {
        sequelize.transaction({ autocommit: false }, function (t) {
            return models.user.create({
                id: uuid.v1(),
                username: argCustomerDTO.username,
                password: argCustomerDTO.password,
                email: argCustomerDTO.email,
                usertype: 'LC',
                usercomment: argCustomerDTO.usercomment,
            }, { transaction: t }).then(function (insertedUser) {
                return models.login.create({
                    id: uuid.v1(),
                    id_user: insertedUser.id,
                    login_time: new Date(Date.now())
                }, { transaction: t });
            });

        }).then(function (insertedloginuser) {
            // Transaction has been committed
            // result is whatever the result of the promise chain returned to the transaction callback is
            var dalResponse: response.DataAccessLayerResponse<string> = new response.DataAccessLayerResponse<string>();
            dalResponse.SetSuccessResult(insertedloginuser.id_user);
            successcallback(dalResponse);
        }).catch(function (err) {
            // Transaction has been rolled back
            // err is whatever rejected the promise chain returned to the transaction callback is
            var dalResponse: response.DataAccessLayerResponse<string> = new response.DataAccessLayerResponse<string>();
            dalResponse.AddErrorDescription(-1, err)
            errorcallback(dalResponse);
        });
    }
    catch (Exeception) {
        var dalResponse: response.DataAccessLayerResponse<string> = new response.DataAccessLayerResponse<string>();
        dalResponse.AddErrorDescription(-1, Exeception)
        errorcallback(dalResponse);
    }


}


export function findOneUser(argEmail: string, successcallback, errorcallback) {

    models.user.findOne({
        where: { email: argEmail }
    }).then(function (databaseuser) {
        // Transaction has been committed
        // result is whatever the result of the promise chain returned to the transaction callback is
        try {
            if (databaseuser) {
                databaseuser = databaseuser.dataValues;
                //user = user.get({plain:true});
                var CustomerDTO: DTO.CustomerDTO = new DTO.CustomerDTO(databaseuser.id, databaseuser.username, databaseuser.password, databaseuser.email, databaseuser.usercomment);
                var dalResponse: response.DataAccessLayerResponse<DTO.CustomerDTO> = new response.DataAccessLayerResponse<DTO.CustomerDTO>();
                dalResponse.SetSuccessResult(CustomerDTO);
                successcallback(dalResponse);
            }
            else {
                var dalResponse: response.DataAccessLayerResponse<DTO.CustomerDTO> = new response.DataAccessLayerResponse<DTO.CustomerDTO>();
                dalResponse.SetSuccessResult(databaseuser);
                successcallback(dalResponse);
            }
        } catch (exception) {
            var dalResponseEx: response.DataAccessLayerResponse<string> = new response.DataAccessLayerResponse<string>();
            dalResponseEx.AddErrorDescription(-1, exception)
            errorcallback(dalResponseEx);
        }
    }, function (error) {
        var dalResponse: response.DataAccessLayerResponse<string> = new response.DataAccessLayerResponse<string>();
        dalResponse.AddErrorDescription(-1, error);
        errorcallback(dalResponse);

    });

};


export function getUserDetailById(argId: string, successcallback, errorcallback) {

    models.user.findOne({
        where: { id: argId }
    }).then(function (databaseuser) {
        // Transaction has been committed
        // result is whatever the result of the promise chain returned to the transaction callback is
        try {
            if (databaseuser) {
                databaseuser = databaseuser.dataValues;
                //user = user.get({plain:true});
                var CustomerDTO: DTO.CustomerDTO = new DTO.CustomerDTO(databaseuser.id, databaseuser.username, databaseuser.password, databaseuser.email, databaseuser.usercomment);
                var dalResponse: response.DataAccessLayerResponse<DTO.CustomerDTO> = new response.DataAccessLayerResponse<DTO.CustomerDTO>();
                dalResponse.SetSuccessResult(CustomerDTO);
                successcallback(dalResponse);
            }
            else {
                var dalResponse: response.DataAccessLayerResponse<DTO.CustomerDTO> = new response.DataAccessLayerResponse<DTO.CustomerDTO>();
                dalResponse.SetSuccessResult(databaseuser);
                successcallback(dalResponse);
            }
        } catch (exception) {
            var dalResponseEx: response.DataAccessLayerResponse<string> = new response.DataAccessLayerResponse<string>();
            dalResponse.AddErrorDescription(-1, exception)
            errorcallback(dalResponseEx);
        }
    }, function (err) {
        // Transaction has been rolled back
        // err is whatever rejected the promise chain returned to the transaction callback is
        var dalResponse: response.DataAccessLayerResponse<string> = new response.DataAccessLayerResponse<string>();
        dalResponse.AddErrorDescription(-1, err)
        errorcallback(dalResponse);
    });

};

export function getUsersDetail(successcallback, errorcallback) {

    sequelize.transaction({ autocommit: false }).then(function (t) {
        models.user.findAll({
            attributes: ['id', 'username', 'email', 'usercomment']
        }).then(function (databaseuser) {
            // Transaction has been committed
            // result is whatever the result of the promise chain returned to the transaction callback is
            try {
                var listofUsers: Array<DTO.CustomerDTO> = new Array<DTO.CustomerDTO>();
                databaseuser.forEach(function (users) {
                    listofUsers.push({
                        id: users.id,
                        username: users.username,
                        email: users.email,
                        password: '',
                        usercomment: users.usercomment
                    });
                });

                var dalResponse: response.DataAccessLayerResponse<Array<DTO.CustomerDTO>> = new response.DataAccessLayerResponse<Array<DTO.CustomerDTO>>();
                dalResponse.SetSuccessResult(listofUsers);
                successcallback(dalResponse);
            } catch (exception) {
                var dalResponseEx: response.DataAccessLayerResponse<string> = new response.DataAccessLayerResponse<string>();
                dalResponse.AddErrorDescription(-1, exception)
                errorcallback(dalResponseEx);

            }
        }).catch(function (err) {
            // Transaction has been rolled back
            // err is whatever rejected the promise chain returned to the transaction callback is
            var dalResponse: response.DataAccessLayerResponse<string> = new response.DataAccessLayerResponse<string>();
            dalResponse.AddErrorDescription(-1, err);
            errorcallback(dalResponse);

        });
    });

}

export function deleteUser(userId: string, successcallback, errorcallback) {
    try {
        sequelize.transaction({ autocommit: false })
            .then(function (t) {
                models.user.destroy({
                    where: {
                        id: userId
                    }
                }).then(function (rowDeleted) {
                    if (rowDeleted === 1) {
                        console.log('Deleted successfully');
                        var dalResponse: response.DataAccessLayerResponse<boolean> = new response.DataAccessLayerResponse<boolean>();
                        dalResponse.SetSuccessResult(true);
                        successcallback(dalResponse);
                    }
                }, function (err) {
                    console.log(err);
                    var dalResponse: response.DataAccessLayerResponse<string> = new response.DataAccessLayerResponse<string>();
                    dalResponse.AddErrorDescription(-1, err)
                    errorcallback(dalResponse);
                });
            });
    }
    catch (exception) {
        var dalResponse: response.DataAccessLayerResponse<string> = new response.DataAccessLayerResponse<string>();
        dalResponse.AddErrorDescription(-1, exception)
        errorcallback(dalResponse);

    }
}