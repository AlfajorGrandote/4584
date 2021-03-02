const controller = {};

controller.list = (req, res) => {
    req.getConnection((err,conn)=>{
        conn.query("SELECT * FROM alumnos", (err, alumnos) =>{
            if(err){
                res.json(err);
            }
            else
            res.render('alumnos', {
                data: alumnos
            });
        });
    });
};

controller.add=(req, res) =>{
    req.getConnection((err,conn)=>{
        if(err){
            res.json(err);
        }
        else
        res.render('alumno_add');
    });
}

controller.save= (req, res) =>{

    const data = req.body;

    //TRANSFORMAR DATOS PARA QUE MYSQL LOS PUEDA LEER
    const leg_alumno = parseInt(data.leg_alumno);
    const dni_alumno = parseInt(data.dni_alumno);
    var fecha =  new Date(data.fecha_nac_alumno);
    data.leg_alumno=leg_alumno;
    data.dni_alumno=dni_alumno;
    data.fecha_nac_alumno = fecha;


    req.getConnection((err, conn) => {
    conn.query('INSERT INTO alumnos set ?', [data], (err, customer) => {
        if(err){
            res.json(err);
        }
        else
        res.redirect('/');
        });
    });
}; 
controller.edit = (req, res) => {

    const {leg_alumno} = req.params;

    req.getConnection((err,conn)=>{
        conn.query('SELECT * FROM alumnos WHERE leg_alumno = ?', [leg_alumno], (err, alumnos) =>{
            if(err){
                res.json(err);
            }
            res.render('alumno_edit', {
                data: alumnos[0]
            })
        });
    });

};

controller.update = (req, res) =>{

    const {leg_alumno} = req.params;
    const newAlumno = req.body;
    
    //TRANSFORMO DATOS PARA QUE SEAN COMPATIBLES CON MYSQL
    newAlumno.leg_alumno = parseInt(newAlumno.leg_alumno);
    newAlumno.cod_postal = parseInt(newAlumno.cod_postal);
    newAlumno.dni_alumno = parseInt(newAlumno.dni_alumno);


    req.getConnection((err, conn)=> {
        conn.query('UPDATE alumnos SET ? WHERE leg_alumno = ?', [newAlumno, leg_alumno], (err, rows) => {
            if(err){
                res.json(err);
            } 
            res.redirect('/');
        });
    });
};
controller.delete=(req, res) =>{
    const {leg_alumno} = req.params;

    req.getConnection((err, conn) => {
        if(err){
            res.json(err);
        }
        else
        conn.query('DELETE FROM alumnos WHERE leg_alumno = ?',[leg_alumno], (err, rows) =>{
            res.redirect('/');
        });
    });
};
controller.consulta1 = (req, res) => {
    req.getConnection((err,conn)=>{
        conn.query("SELECT * FROM alumnos WHERE cod_postal = 7601", (err, alumnos) =>{
            if(err){
                res.josn(err);
            }
            res.render('consultas', {
                data: alumnos
            });
        });
    });
};

controller.consulta2 = (req, res) => {
    req.getConnection((err,conn)=>{
        
        conn.query("SELECT * FROM alumnos WHERE YEAR(fecha_nac_alumno) = '2002'", (err, alumnos) =>{
            if(err){
                res.json(err);
            }
            res.render('consultasB', {
                data: alumnos
            });
        });
    });

};
controller.consulta3 = (req, res) => {
    req.getConnection((err,conn)=>{
        
        conn.query("SELECT * FROM alumnos WHERE cod_postal = 7601 && grupo_sang_alumno = 'RH-' ", (err, alumnos) =>{
            if(err){
                res.json(err);
            }
            res.render('consultasC', {
                data: alumnos
            });
        });
    });

};
controller.consulta4 = (req, res) => {
    req.getConnection((err,conn)=>{
        
        conn.query("SELECT * FROM alumnos ORDER BY dni_alumno ASC", (err, alumnos) =>{
            if(err){
                res.json(err);
            }
            res.render('consultasD', {
                data: alumnos
            });
        });
    });

};
controller.consulta5 = (req, res) => {
    req.getConnection((err,conn)=>{
        conn.query("SELECT * FROM alumnos WHERE dom_alumno LIKE 'Av. J.B. Justo.%'", (err, alumnos) =>{
            if(err){
                res.json(err);
            }
            res.render('consultasE', {
                data: alumnos
            });
        });
    });

};

module.exports = controller;