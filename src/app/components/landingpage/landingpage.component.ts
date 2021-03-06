import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryService } from "src/app/services/country-service.service";
import { SuitecrmService } from "src/app/services/suitecrm.service";
import { FilterService } from "primeng/api";
import { CastExpr } from '@angular/compiler';


@Component({
  selector: 'landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css','../../../assets/showcase/styles/flags.css'],
  providers: [CountryService, FilterService]
})



export class LandingpageComponent implements OnInit {

  red_social: any;
  datos_landing: any;
  countries: any[] = [];
  countries2: any[] = [];
  cities: any[] = [];
  image: any;
  message: any;
  filteredCountries: any[] = [];
  filteredCountries2: any[] = [];
  filteredCities: any[] = [];
  selectedCountryAdvanced: any[];
  nombre_completo: string;
  cel_agente_ventas: string;
  texto_requerido: string;
  dt: Date;
  fecha_exp: string;
  ciudad: string;

  pais_default: any;
  clicked: boolean = false;
  code_default: any;
  texto_boton: string;
  enableCities: boolean;
  
  

  constructor(
    private countryService: CountryService,
    private crmService: SuitecrmService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {   
    
    this.countries = [];
    this.countries2 = [];
    this.cities = [];
    this.filteredCountries = [];
    this.filteredCountries2 = [];
    this.filteredCities = [];
    this.red_social = this.route.snapshot.paramMap.get('red_social');
    console.log(this.route.snapshot.paramMap.get('red_social'));
  }
  
  
  ngOnInit(): void {
    
    let dias_vigencia=30;
    this.crmService.obtine_tipo_prospecto().subscribe(response => {
      if(response.data){
        response.data.forEach(element => {
          if(element.name=="NORMAL"){
            switch (element.tiempo_de_vigencia_dma){
              case 'DAY':dias_vigencia=element.tiempo_de_vigencia_cantidad;break
              case 'MONTH':dias_vigencia=element.tiempo_de_vigencia_cantidad*30;break;
              case 'YEAR':dias_vigencia=element.tiempo_de_vigencia_cantidad*365;break;
              default: dias_vigencia=30;
            }
            console.log(element);
            console.log("cantidad de dias de vigencia: "+dias_vigencia);
          }
        });
      }
    });

    this.dt = new Date();
    this.dt.setDate(this.dt.getDate() + dias_vigencia);
    let aux=this.dt.toLocaleDateString().split("/");
    this.fecha_exp=aux[2]+"-"+aux[1]+"-"+aux[0];

    this.enableCities=true;
    this.texto_requerido="";
    this.clicked=false;
    this.code_default={
      "cod_pais": "BO",
      "nombre_pais": "Bolivia",
      "numero_pais": 591
    };
    this.pais_default={
      "id": "BO",
      "name": "Bolivia"
    };
    this.texto_boton="Solicitar Informaci??n";
    this.countryService.getdbCountries("any").subscribe(response => {
      if (response.success) {
        this.countries = response.data;
      }
    },  error => {
        console.log("error al cargar los datos");
      });

    this.countryService.listarPais().subscribe(response => {
      console.log(response);
      this.countries2 = response;
    },  error => {
        console.log("error al cargar los datos");
      });

      this.countryService.getdbimage("any").subscribe(response => {
        if (response.success) {
          this.image = response.data[0].ruta_imagen;
          //console.log(this.image);
        }
      },  error => {
          console.log("error al cargar los datos");
        });

        this.countryService.getdbmessage("any").subscribe(response => {
          if (response.success) {
            this.message = response.data[0].mensaje;
            //console.log(this.message);
          }
        },  error => {
            console.log("error al cargar los datos");
          });

      this.countryService.getCRMdbStates("BO").subscribe(response => {
        if (response.success) {
          this.cities = response.data;
        }
      },  error => {
          console.log("error al cargar los datos");
        });

    this.datos_landing = this.formBuilder.group( {
      nombre : ['',[Validators.required,Validators.maxLength(50)]],
      ap_pat : ['',[Validators.required,Validators.maxLength(50)]],
      ap_mat : ['',Validators.maxLength(50)],
      codigo : ['',Validators.required],
      celular : ['',[Validators.required,Validators.minLength(6),Validators.maxLength(20)]],
      email : ['',Validators.email],
      pais : ['',Validators.required],
      ciudad : [''],
    });
    this.datos_landing.patchValue({ pais: this.pais_default, codigo: this.code_default });
    //this.datos_landing.nombre.valid;

  }
  onSubmit(){
    console.log(this.datos_landing.value);
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.datos_landing.controls;
    for (const name in controls) {
        console.log(controls[name]);
        if (controls[name].invalid) {
            invalid.push(name);
            console.log(name);
        }
    }
    return invalid;
  }
  
  recargaciudades(value){
    this.cities = [];
    this.datos_landing.controls['ciudad'].reset();
    let i = this.countries2.map(function (elem) { return elem.abr_pais }).indexOf(value.abr_pais);
    if (i >= 0) {
      this.cities = this.countries2[i].estados;
      this.enableCities=true;
    }else{
      this.enableCities=false;
    }
  }

  abrirLink(){

    if(this.datos_landing.valid){
      this.texto_boton="Enviando solicitud... espere por favor";
      this.clicked=true;
      let token="";
      let id_agente_ventas="2fd67f1f-6635-986f-49aa-610c59ecb599";
      this.cel_agente_ventas="70187866";
      let json_obtiene_vendedor:any;
      json_obtiene_vendedor={
        ciudad:((this.datos_landing.controls['ciudad']?.value?.estado) ? this.datos_landing.controls['ciudad']?.value?.estado : 'Santa Cruz'),
        nombre:this.datos_landing.controls['nombre'].value,
        apellido:this.datos_landing.controls['ap_pat'].value,
        telefono:"+"+this.datos_landing.controls['codigo'].value.numero_pais + "" + this.datos_landing.controls['celular'].value
      };
      console.log(json_obtiene_vendedor);
      this.crmService.obtienevendedorv2(json_obtiene_vendedor).subscribe(response => {
        if(response.data!=null){
          id_agente_ventas=response.data[0].id;
          this.cel_agente_ventas=response.data[0].telefono;
        }
        console.log(this.cel_agente_ventas+"   "+id_agente_ventas);

        this.nombre_completo = this.datos_landing.controls['nombre'].value + " " + this.datos_landing.controls['ap_pat'].value + " " + this.datos_landing.controls['ap_mat'].value
        let numero_completo = "+"+this.datos_landing.controls['codigo'].value.numero_pais + "" + this.datos_landing.controls['celular'].value;
        let data_crear_prospecto={
          "data": {
            "type": "Leads",
            "attributes": {
              "name": this.nombre_completo,
              "first_name": this.datos_landing.controls['nombre'].value,
              "last_name": this.datos_landing.controls['ap_pat'].value,
              "last_name2_c": " ",
              "phone_mobile": numero_completo,
              "email1": " ",
              "account_name": this.nombre_completo,
              "primary_address_country": this.datos_landing.controls['pais'].value.abr_pais,
              "primary_address_state": ((this.datos_landing.controls['ciudad']?.value?.abr_estado) ? this.datos_landing.controls['ciudad']?.value?.abr_estado : '00'),
              "assigned_user_id": id_agente_ventas,
              "lead_source2_c": this.red_social.toUpperCase(),
              "lead_source": "LANDING_PAGE",
              "etapa_c": "CAPTADO",
              "fecha_validez_c":this.fecha_exp,
              "tipo_prospecto_c": "NORMAL"
            }
          } 
        }
        if(this.datos_landing.controls['ap_mat'].value!=""){
          data_crear_prospecto.data.attributes.last_name2_c=this.datos_landing.controls['ap_mat'].value;
        }
        if(this.datos_landing.controls['email'].value!=""){
          data_crear_prospecto.data.attributes.email1=this.datos_landing.controls['email'].value;
        }
        let respuesta_creacion:any;
        
        this.crmService.gettokenoauth("any").subscribe(response => {
          token = response.access_token;
          console.log("eltoken-> ",token);
          this.crmService.guardaprospecto(data_crear_prospecto,token).subscribe(response => {
              respuesta_creacion=response;
              console.log(respuesta_creacion);
              this.enviarmensaje();
            },  error => {
              console.log("error al guardar prospecto");
            });
        },  error => {
          console.log("error al cargar token");
        });

      },  error => {
        console.log("error al obtener vendedor");
      });
      
      
      
    }else{
      console.log("form invalido");
      this.texto_requerido="Campo requerido";
    }

    
  }

  enviarmensaje(){
    this.texto_boton="Solicitud enviada";
    this.message=this.message.replace("@@empresa","El Pahuichi");
    this.message=this.message.replace("@@nombre_completo",this.nombre_completo);
    this.message=this.message.replace("@@ciudad",this.datos_landing.controls['pais'].value.pais+", "+((this.datos_landing.controls['ciudad']?.value?.estado) ? this.datos_landing.controls['ciudad']?.value?.estado : ''));
    var url = 'https://api.whatsapp.com/send?phone='+this.cel_agente_ventas+'&text=' + encodeURIComponent(this.message);
    window.open(url, "_blank");
  }

  filterCountry(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.countries.length; i++) {
      let country = this.countries[i];
      if (country.nombre_pais.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredCountries = filtered;
  }

  filterCountry2(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.countries2.length; i++) {
      let country = this.countries2[i];
      if (country.pais.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredCountries2 = filtered;
  }

  filterCity(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.cities.length; i++) {
      let city = this.cities[i];
      if (city.estado.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(city);
      }
    }

    this.filteredCities = filtered;
  }
  

}
function token(data_crear_prospecto: { data: { type: string; attributes: { name: any; first_name: any; last_name: any; phone_mobile: any; email1: any; account_name: string; }; }; }, token: any) {
  throw new Error('Function not implemented.');
}

