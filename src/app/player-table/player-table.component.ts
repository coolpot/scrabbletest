import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PlayerDataService } from '../player-data.service';
import { Player } from '../player.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss'],
})
export class PlayerTableComponent implements OnInit {
  displayedColumns: string[] = [
    'orderBy',
    'Name',
    'GamesPlayed',
    'TotalScore',
  ];
  @ViewChild(MatSort) sort: MatSort;
  playerDataArray: Player[] = [];
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
      this.playerDataArray.sort((a,b) => (b.TotalScore - a.TotalScore));
      const newArray: Player[] = this.playerDataArray.map((item, idx) => ({...item, orderBy: idx + 1}));
      this.dataSource = new MatTableDataSource(newArray);
      this.dataSource.sort = this.sort;
    });
  }

}
