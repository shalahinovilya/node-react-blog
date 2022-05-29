import * as uuid from 'uuid';
import * as path from 'path';

class fileService {

    saveFile(file) {

        try {

            const fileName = uuid.v4() + '.jpg'
            const filePath = path.resolve('/../js projects/nodeReactBlog/client/src/static', fileName)
            file.mv(filePath)
            return fileName

        } catch (e) {

            console.log(e)

        }
    }

}

export default new fileService();
