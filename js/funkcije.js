 var Korisnici=[];
 var Gradovi =[];
 var VrstaPrijevoza =[];
 oDbKorisnici.on('value', function(oOdgovorPosluzitelja) 
{
	var oTablicaKorisnici = $('#tablica-korisnici');
	oTablicaKorisnici.find('tbody').empty();
	var KorisniciDrop =$('#nalog_korisnik');
	var KorisniciUredi =$('#uredi_korisnik');
	var Rbr =1;
	var Aktivnost ="";
	oOdgovorPosluzitelja.forEach(function(oKorisnikSn)
	{
		var sKorisnikKey = oKorisnikSn.key;
		var oKorisnik = oKorisnikSn.val();
		if(oKorisnik.aktivan == "0")
		{
			Aktivnost ="Neaktivan";
		}
		else
		{
			Aktivnost="Aktivan";
		}
		var sRowKorisnik = '<tr><td>' + Rbr++ + ' </td><td> ' + oKorisnik.ime +' '+ oKorisnik.Prezime +'</td><td> '+ Aktivnost +'</td><td><button id="btnUrediKorisnika" onclick="UrediKorisnika(\''+sKorisnikKey+'\')" type="button" class="btn btn-sm btn-edit"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button></td></tr>';
		
		var sDropRow = '<option value="'+ sKorisnikKey +'">' + oKorisnik.ime + ' '+ oKorisnik.Prezime  + '</option>';
		KorisniciDrop.append(sDropRow);
		KorisniciUredi.append(sDropRow);
		oTablicaKorisnici.find('tbody').append(sRowKorisnik);		
		Korisnici.push({ "korisnik_id": sKorisnikKey, "ime": oKorisnik.ime, "prezime": oKorisnik.Prezime });
	});
});
  oDbGradovi.on('value', function(oOdgovorPosluzitelja) 
{
	var oGradDropOdr = $('#nalog_polaziste');
	var oGradDropPol = $('#nalog_odrediste');
	var oGradUrediOdr = $('#uredi_polaziste');
	var oGradUrediPol = $('#uredi_odrediste');
	oOdgovorPosluzitelja.forEach(function(oGradSn)
	{
		var sGradKey = oGradSn.key;
		var oGrad = oGradSn.val();
		var sRowGrad = '<option value="'+ sGradKey +'">' + oGrad.naziv + '</option>';
		oGradDropPol.append(sRowGrad);
		oGradDropOdr.append(sRowGrad);
		oGradUrediPol.append(sRowGrad);
		oGradUrediOdr.append(sRowGrad);
		Gradovi.push({ "grad_id": sGradKey, "naziv": oGrad.naziv });
	});
});
 oDbVrstaPrijevoza.on('value', function(oOdgovorPosluzitelja) 
{
	var oDropVrsta = $('#nalog_vrsta');
	var oDropUrediVrsta = $('#uredi_vrsta');
	var oTablicaVrste = $('#tablica-vrste');
	oTablicaVrste.find('tbody').empty();
	var Rbr=1;
	oOdgovorPosluzitelja.forEach(function(oVrstaSn)
	{
		var sVrstaKey = oVrstaSn.key;
		var oVrsta = oVrstaSn.val();
		var sDropVrsta = '<option value="'+ sVrstaKey +'">' + oVrsta.ime +'</option>';
		var sRowVrsta ='<tr><td>' + Rbr++ + ' </td><td> ' + oVrsta.ime  +'</td><td><button id="btnUrediKorisnika" onclick="UrediVrstu(\''+sVrstaKey+'\')" type="button" class="btn btn-sm btn-edit"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button></td></tr>';
		oDropVrsta.append(sDropVrsta);
		oDropUrediVrsta.append(sDropVrsta);
		oTablicaVrste.find('tbody').append(sRowVrsta);
		VrstaPrijevoza.push({ "vrsta_id": sVrstaKey, "ime": oVrsta.ime });
	});
});
 oDbPutniNalozi.on('value', function(oOdgovorPosluzitelja) 
{
	var oTablicaPutniNalozi = $('#tablica-nalozi');
	oTablicaPutniNalozi.find('tbody').empty();
	var Rbr =1;
	oOdgovorPosluzitelja.forEach(function(oPutniNaloziSn)
	{
		var sNalogKey = oPutniNaloziSn.key;
		var oPutniNalog = oPutniNaloziSn.val();
		var sRow = '<tr><td>' + Rbr++ + ' </td><td> '+ DajKorisnika( oPutniNalog.korisnik )+' </td><td> '+ DajVrstu(oPutniNalog.vrsta_prijevoza) +'</td><td> '+  DajGrad(oPutniNalog.polaziste) + '</td><td> ' + DajGrad(oPutniNalog.odrediste) + '</td><td>' + oPutniNalog.datum_odlazak + '</td><td>' + oPutniNalog.datum_povratak + '</td><td><button onclick="ObrisiNalog(\''+sNalogKey+'\')" type="button" class="btn btn-sm btn-danger"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></td><td><button  onclick="UrediNalog(\''+sNalogKey+'\')" id="btnUredi" type="button" class="btn btn-sm btn-edit"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button></td></tr>';
		oTablicaPutniNalozi.find('tbody').append(sRow);
	});
});
 function ObrisiNalog(sNalogKey)
{
	var oPutniNalogRef = oDb.ref('putni_nalozi/' + sNalogKey);
	oPutniNalogRef.remove();
}
function DodajNalog() 
{

	var sKorisnikNalog = $('#nalog_korisnik').val();
	var sVrstaNalog = $('#nalog_vrsta').val();
	var sPolaziste =$('#nalog_polaziste').val();
	var sOdrediste =$('#nalog_odrediste').val();
	var sDatumPolaska=$('#inpt_odlazak').val();
	var sDatumpovratak=$('#inpt_povratak').val();
	var sSvrha=$('#inpt_svrha').val();

	// Generiranje novoga ključa u bazi
	var sKey = firebase.database().ref().child('putni_nalog').push().key;

    var oNalog = 
    {
       korisnik: sKorisnikNalog,
       vrsta_prijevoza:sVrstaNalog,
       polaziste:sPolaziste,
       odrediste:sOdrediste,
       datum_odlazak:sDatumPolaska,
       datum_povratak:sDatumpovratak,
       svrha_putovanja: sSvrha
    };
    console.log(oNalog);

    // Zapiši u Firebase
    var oZapis = {};
    oZapis[sKey] = oNalog;
    oDbPutniNalozi.update(oZapis);
}
function DajKorisnika(korisnik)
{
	var sKorisnik = "";
	Korisnici.forEach(function(oElement) {
	    if(korisnik == oElement.korisnik_id)
	    {
	    	sKorisnik = oElement.ime + ' ' +oElement.prezime;
	    }
	});
	return sKorisnik;
}
function DajGrad(grad)
{
	var sGrad = "";
	Gradovi.forEach(function(oElement) {
	    if(grad == oElement.grad_id)
	    {
	    	sGrad = oElement.naziv;
	    }
	});
	return sGrad;
}
function DajVrstu(vrsta)
{
	var sVrsta = "";
	VrstaPrijevoza.forEach(function(oElement) {
	    if(vrsta == oElement.vrsta_id)
	    {
	    	sVrsta = oElement.ime;
	    }
	});
	return sVrsta;
}
function UrediNalog(sNalogKey)
{
	var oNalogRef = oDb.ref('putni_nalozi/' + sNalogKey); // odabrana vijest

	oNalogRef.once('value', function(oOdgovorPosluzitelja)
	{
		var oNalog = oOdgovorPosluzitelja.val();
		// Popunjavanje elemenata forme za uređivanje
		$('#uredi_korisnik').val(oNalog.korisnik);
		$('#uredi_vrsta').val(oNalog.vrsta_prijevoza);
		$('#uredi_polaziste').val(oNalog.polaziste);
		$('#uredi_odrediste').val(oNalog.odrediste);
		$('#uredi_odlazak').val(oNalog.datum_odlazak);
		$('#uredi_povratak').val(oNalog.datum_povratak);
		$('#uredi_svrha').val(oNalog.svrha_putovanja);

		// Dodavanje događaja na gumb Ažuriraj
		$('#btnUrediNalog').attr('onclick', 'SpremiUredjeniNalog("'+ sNalogKey +'")');

		// Prikaži modal
		$('#uredi-nalog').modal('show');
	});
}
function SpremiUredjeniNalog(sNalogKey)
{
	var oNalogRef = oDb.ref('putni_nalozi/' + sNalogKey);

	var KorisnikNalog =$('#uredi_korisnik').val();
	var VrstaNalog = $('#uredi_vrsta').val();
	var Polaziste =$('#uredi_polaziste').val();
	var Odrediste =$('#uredi_odrediste').val();
	var DatumPolaska=$('#uredi_odlazak').val();
	var Datumpovratak=$('#uredi_povratak').val();
	var Svrha=$('#uredi_svrha').val();

	var oNalog = 
	{
		korisnik: KorisnikNalog,
        vrsta_prijevoza: VrstaNalog,
        polaziste: Polaziste,
        odrediste: Odrediste,
        datum_odlazak: DatumPolaska,
        datum_povratak: Datumpovratak,
        svrha_putovanja:  Svrha
	};
	oNalogRef.update(oNalog);
}
function DodajKorisnika() 
{

	var sKorisnikIme = $('#inpt_ime').val();
	var sKorisnikPrezime= $('#inpt_prezime').val();
	var sAktivnost = $('#inpt_aktivnost').val();

	// Generiranje novoga ključa u bazi
	var sKey = firebase.database().ref().child('korisnici').push().key;

    var oKorisnik = 
    {
      ime: sKorisnikIme,
      Prezime: sKorisnikPrezime,
      aktivan: sAktivnost
    };

    // Zapiši u Firebase
    var oZapis = {};
    oZapis[sKey] = oKorisnik;
    oDbKorisnici.update(oZapis);
}
function UrediKorisnika(sKorisnikKey)
{
	var oKorisnikRef = oDb.ref('korisnici/' + sKorisnikKey); // odabrana vijest

	oKorisnikRef.once('value', function(oOdgovorPosluzitelja)
	{
		var oKorisnik = oOdgovorPosluzitelja.val();
		// Popunjavanje elemenata forme za uređivanje
		$('#uredi_ime').val(oKorisnik.ime);
		$('#uredi_prezime').val(oKorisnik.Prezime);
		var Aktivan = oKorisnik.aktivan;
		if(Aktivan == "1")
		{
			$('#uredi_aktivnost').prop('checked', true);
		}
		else
		{
			$('#uredi_aktivnost').prop('checked', false);
		}
		$('#btnUrediKorisnika').attr('onclick', 'SpremiUredjenogKorisnika("'+ sKorisnikKey +'")');

		// Prikaži modal
		$('#uredi-korisnika').modal('show');
	});
}
function SpremiUredjenogKorisnika(sKorisnikKey)
{
	var sChecked="";
	var oKorisnikRef = oDb.ref('korisnici/' + sKorisnikKey);

	var KorisnikIme =$('#uredi_ime').val();
	var KorisnikPrezime = $('#uredi_prezime').val();
	var Aktivnost =  $('#uredi_aktivnost').is(":checked");
	var sAkt ="";
	if(Aktivnost == true)
		{
			sAkt ="1";
		}
		else
		{
			sAkt ="0";
		}
	var oKorisnik = 
	{
		ime: KorisnikIme,
        Prezime: KorisnikPrezime,
        aktivan: sAkt
	};
	console.log(oKorisnik);
	oKorisnikRef.update(oKorisnik);

}
function DodajVrstu() 
{

	var sVrstaNaziv = $('#inpt_naziv_vrsta').val();
	var sAktivnost = "1";

	// Generiranje novoga ključa u bazi
	var sKey = firebase.database().ref().child('vrsta_prijevoza').push().key;

    var oVrsta = 
    {
      ime: sVrstaNaziv,
      aktivan: sAktivnost
    };

    // Zapiši u Firebase
    var oZapis = {};
    oZapis[sKey] = oVrsta;
    oDbVrstaPrijevoza.update(oZapis);
}
function UrediVrstu(sVrstaKey)
{
	var oVrstaRef = oDb.ref('vrsta_prijevoza/' + sVrstaKey); // odabrana vijest

	oVrstaRef.once('value', function(oOdgovorPosluzitelja)
	{
		var oVrsta = oOdgovorPosluzitelja.val();
		// Popunjavanje elemenata forme za uređivanje
		$('#uredi_naziv_vrsta').val(oVrsta.ime);
		// Dodavanje događaja na gumb Ažuriraj
		$('#btnUrediVrstu').attr('onclick', 'SpremiUredjenuVrstu("'+ sVrstaKey +'")');

		// Prikaži modal
		$('#uredi-vrstu').modal('show');
	});
}
function SpremiUredjenuVrstu(sVrstaKey)
{
	var oVrstaRef = oDb.ref('vrsta_prijevoza/' + sVrstaKey);

	var VrstaIme =$('#uredi_naziv_vrsta').val();
	var Aktivnost = "1";
	var oVrsta = 
	{
		ime: VrstaIme,
        aktivan: Aktivnost
	};
	oKorisnikRef.update(oKorisnik);
}