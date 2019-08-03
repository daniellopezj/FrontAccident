import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label, SingleDataSet } from 'ng2-charts';
import { AccidentService } from 'src/app/services/AccidentService';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showinfo: boolean;
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  //**GRAFICA DE BARRAS 1  */
  public barChartLabelMonth: Label[] = ['marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  public barChartDataYear: ChartDataSets[] = [];
  public barChartColors = [
    {
      backgroundColor: ['rgba(25,10,156,0.3)'],
    },
  ];

  //**GRAFICA DE BARRAS 2  */
  public barChartLabel2: Label[] = [];
  public barChartType2: ChartType = 'line';
  public barChartData2: ChartDataSets[] = [];
  public barChartColors2 = [
    {
      backgroundColor: ['rgba(136,109,15,0.3)'],
    },
  ];


  //**GRAFICA DE TORTA 2  DE ACCIDENTE REPORTADO O NO */
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public pieChartLabels: Label[] = ['Reportado', 'No reportado'];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];


  public pieChartLabels2: Label[] = [];
  public pieChartData2: number[] = [];
  public pieChartType2: ChartType = 'pie';
  public pieChartLegend2 = true;
  public pieChartPlugins2 = [pluginDataLabels];


  public polarAreaChartLabels: Label[] = [];
  public polarAreaChartData: SingleDataSet = [];
  public polarAreaLegend = true;
  public polarAreaChartType: ChartType = 'polarArea';

  constructor(private accidentService: AccidentService) {
    this.callgets();
  }


  callgets() {
    this.accidentService.getmonth().subscribe(res => {
      let valor: any;
      valor = res;
      let data: Array<number> = [];
      valor.forEach(element => {
        data.push(element.total);
      });
      this.barChartDataYear = [{ data: data, label: "Accidentes por Mes" },]
      this.load_days();
    });
  }

  load_days() {
    this.accidentService.getdayWeek().subscribe(res => {
      let valor: any;
      valor = res;
      let data: Array<number> = [];
      valor.forEach(element => {
        data.push(element.total);
        this.polarAreaChartLabels.push(element._id);
      });
      this.polarAreaChartData = data
      this.reportAccident()
    })
  }

  reportAccident() {
    this.accidentService.getPoliceReport().subscribe(res => {
      let valor: any;
      valor = res;
      let data: Array<number> = [];
      valor.forEach(element => {
        data.push(element.total);
      });
      this.pieChartData = data;
      this.county();
    })
  }


  county() {
    this.accidentService.getcountyName().subscribe(res => {
      let valor: any;
      valor = res;
      let data: Array<number> = [];
      valor.forEach(element => {
        data.push(element.total);
        this.pieChartLabels2.push(element._id);
      });
      this.pieChartData2 = data;
      this.numCars();
    })
  }

  numCars() {
    this.accidentService.getnumVechicle().subscribe(res => {
      let valor: any;
      valor = res;
      let data: Array<number> = [];
      valor.forEach(element => {
        data.push(element.total);
        this.barChartLabel2.push(element._id);
      });
      this.barChartData2 = [{ data: data, label: "vehiculos involucrados" },]
      this.showinfo = true;
    });
  }

  public randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }

  public randomize2(): void {
    this.barChartType2 = this.barChartType2 === 'bar' ? 'line' : 'bar';
  }

  ngOnInit() {
  }

}