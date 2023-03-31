const List = require('../modes/list')
class homeController {
    get(req, res) {
        List.find({})
            .then(list => { res.json(list) })
            .catch(err => res.status(500).json({ error: err }))
    }
    delete(req, res) {
        List.deleteOne({ _id: req.params.id })
            .then(() => res.send('Xóa thành công'))
            .catch(err => res.status(500).json({ error: err }))
    }
    post(req, res) {
        const { name } = req.body;
        const newItem = new List({ name: name });
        newItem.save()
            .then(item => res.json(item))
            .catch(err => { res.status(500).json({ error: err }) });
    }
    put(rep, res) {
        const itemFix = rep.body;
        const { id } = rep.params
        List.findByIdAndUpdate(id, itemFix, { new: true })
            .then(updatedItem => {
                if (!updatedItem) {
                    return res.status(404).send('Item not found');
                }
                res.send(updatedItem);
            })
            .catch(error => {
                res.status(500).send(error.message);
            });
    }
}
module.exports = new homeController();