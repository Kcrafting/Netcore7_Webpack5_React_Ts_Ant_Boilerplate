create trigger ZZ_KingHoo_UpdateMessage on Z_ after insert
as begin
--更新语句 fitemid fbatchno
--t_bos_zjbb
--alter table Z_ disable trigger ZZ-king

--select * from inserted
update Z_ 
set 材质 = '',仓位=''
from Z_ A inner join t_bos_zjbb B on Z_.fitemid=B.fitemid and Z_.fbatchno = B.fbatchno

--select * from deleted
end