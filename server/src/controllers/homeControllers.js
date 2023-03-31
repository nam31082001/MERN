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
        List.findByIdAndUpdate(rep.params.id,
            { $set: { name: req.body }},
            { new: true },
            (err, record) => {
                if (err) return res.status(500).send(err);
                return res.send(record);
            }
        );
        
    }
}
module.exports = new homeController();