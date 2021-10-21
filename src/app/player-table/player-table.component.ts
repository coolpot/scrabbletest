import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PlayerDataService } from '../player-data.service';
import { Player } from '../player.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss'],
})
export class PlayerTableComponent implements OnInit {
  displayedColumns: string[] = [
    'PlayerId',
    'Name',
    'GamesPlayed',
    'TotalScore',
  ];
  @ViewChild(MatSort) sort: MatSort;
  playerData = [];
  gameData = [];
  playerDataArray = [];
  dataSource;

  constructor(private playerDataService: PlayerDataService) {}

  ngOnInit(): void {
    this.playerDataService.getCombinedPlayerData().subscribe((res) => {
      const players = res[0].Players;
      const games = res[1].Results;
      this.playerDataArray = players.map((p) => ({
        ...p,
        ...games.find((g) => g.PlayerId === p.PlayerId),
      }));
      this.dataSource = new MatTableDataSource(this.playerDataArray);
      this.dataSource.sort = this.sort; 

      console.log(this.dataSource, 'ds');
      console.log(this.dataSource.sort, 'sort');
    });
  }

}
