CREATE TABLE IF NOT EXISTS Usuario
(
	id_usuario int NOT NULL AUTO_INCREMENT,
    dni varchar(8) NOT NULL,
	nom_usu varchar(50) NOT NULL,
	apellidos varchar(50) NOT NULL,
	telefono int NOT NULL,
	correo varchar (50) NOT NULL,
	password varchar(50) NOT NULL,
	genero varchar(20) NOT NULL,
	fecha_inscripcion varchar(50) NOT NULL,
	direccion varchar(50) NOT NULL,
    PRIMARY KEY (id_usuario)
);

INSERT INTO Usuario (dni, nom_usu, apellidos,telefono,correo,password,genero,fecha_inscripcion,direccion)
VALUES ('12345678', 'Pedro', 'Lopez',12345678,'hola@homail.com','123456','Masculino','01/01/2020','asd');

INSERT INTO Usuario (dni, nom_usu, apellidos,telefono,correo,password,genero,fecha_inscripcion,direccion)
VALUES ('87654321', 'Luis', 'Chavez',123456789,'hello@hotmail.com','123456','Masculino','01/01/2020','asd');
