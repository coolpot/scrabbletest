import { Component, OnInit } from '@angular/core';
import { PlayerDataService } from '../player-data.service';
import { Player } from '../player.model';
import { combineLatest, forkJoin } from 'rxjs';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss']
})

export class PlayerTableComponent implements OnInit {
  displayedColumns: string[] = ['PlayerId', 'Name', 'GamesPlayed', 'TotalScore'];
  playerTableData: Player[] = [];
  
  constructor(private playerDataService: PlayerDataService) { }

  ngOnInit(): void {
    // I feel There's better ways of doing this!
    this.playerDataService.getCombinedPlayerData().subscribe(res => {
      const players = res[0].Players;
      const results = res[1].Results;
      const combinedData = players.map((item, i) => Object.assign({}, item, results[i]));
      this.playerTableData = combinedData;
      console.log(this.playerTableData);
    });
  }

}
