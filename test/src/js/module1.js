import _ from 'lodash';

export default function (arg = "default") {
    console.log(_.join(["module1", arg], ' '));
}
