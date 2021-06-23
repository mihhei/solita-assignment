create table vaccine ( 
    id varchar(40) primary key, 
    orderNumber int, 
    responsiblePerson varchar(40), 
    healthCareDistrict varchar(10), 
    vaccine varchar(20), 
    injections int, 
    arrived datetime(6)
    );

create table vaccination ( 
    vaccinationId varchar(40) primary key, 
    sourceBottle varchar(40), 
    gender varchar(10), 
    vaccinationDate datetime(6), 
    foreign key (sourceBottle) references vaccine (id) 
    );


select * from vaccination inner join vaccine on vaccination.sourceBottle = vaccine.id and vaccine.arrived < '2021-01-03 06:18:28.687745';


