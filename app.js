const express = require('express')
const app = express();
const got = require('got');
const taxontotree = require('./taxontotree.json')
const treetostudy = require('./treetostudy.json')

const port = 4000

app.get('/species/:key/trees', async (req, res) => {
    try {
        if(taxontotree[req.params.key]){
            let data = [];
            let trees = taxontotree[req.params.key].trees;
            for(tree of trees){
                try {
                let studyIDJSON = treetostudy[tree].study;
                //console.log(studyID)
                let study = await got(`https://thomasstjerne.github.io/treebasestatic/studies/${studyIDJSON}`).json();
                //console.log(study)
                let studyId = studyIDJSON.split('.')[0]
                let phylotreeId = tree.split('.')[0]
                const treeMeta = study.trees.find(t => t.phylotree_id === tree);
                delete study.trees;
                data.push({studyId, phylotreeId, study, tree: treeMeta});

                } catch (error) {
                   console.log(error)
                   res.sendStatus(500)
                }
                
            }
            
            res.send(data);
        } else {
            res.status(404)
        }
       
    } catch (error) {
        
    }
})

app.listen(port, () => {
  console.log(`GBIF species key to treebase tree listening on ${port}`)
})