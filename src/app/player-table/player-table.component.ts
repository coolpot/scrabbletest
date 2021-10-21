import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PlayerDataService } from '../player-data.service';
import { Player } from '../player.model';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss']
})

export class PlayerTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['PlayerId', 'Name', 'GamesPlayed', 'TotalScore'];
  dataSource = new MatTableDataSource<Player>();
  
  playerData = [];
  gameData = [];

  constructor(private playerDataService: PlayerDataService) { }
  @ViewChild(MatSort, { static: false}) sort: MatSort;


  
  ngOnInit(): void {
    this.playerDataService.getCombinedPlayerData().subscribe(res => {
      const players = res[0].Players;
      const games = res[1].Results;
      console.log(players, games);
      const playerDataArray = players.map(p => ({ ...p, ...games.find(g => g.PlayerId === p.PlayerId) }));
      this.dataSource = playerDataArray;
    });
    

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

}
