/**
 * @file 对配置文件的读取合并等等
 * @author ielgnaw(wuji0223@gmail.com)
 */

import Manis from 'manis';
import {join} from 'path';
import yaml from 'js-yaml';

'use strict';

let STORAGE = null;

// const JSON_YAML_REG = /.+\.(json|yml)$/i;

/**
 * 获取 merge 后的配置文件
 *
 * @param {string} filePath 待检查的文件路径，根据这个路径去寻找用户自定义的配置文件，然后和默认的配置文件 merge
 * @param {boolean} refresh 是否强制刷新内存中已经存在的配置
 *
 * @return {Object} merge 后的配置对象
 */
export function loadConfig(filePath, refresh) {
    if (!refresh && STORAGE) {
        return STORAGE;
    }

    let manis = new Manis({
        files: [
            '.csshintrc'
        ],
        loader(content) {
            if (!content) {
                return '';
            }
            let ret;
            try {
                ret = yaml.load(content);
            }
            catch (e) {}
            // if (basename(filePath) === '.csshintrc') {
            //     return JSON.parse(stripJSONComments(content));
            // }
            //
            // let match = filePath.match(JSON_YAML_REG);
            //
            // if (match) {
            //     let suffix = match[1];
            //     if (suffix === 'json') {
            //         return JSON.parse(stripJSONComments(content));
            //     }
            //     else if (suffix === 'yml') {
            //         return yaml.load(content);
            //     }
            // }
            return ret;
        }
    });

    manis.setDefault(join(__dirname, './csshint.yml'));

    STORAGE = manis.from(filePath);

    return STORAGE;
}
