import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-dashboard',
  standalone: false,
  templateUrl: './member-dashboard.component.html',
  styleUrl: './member-dashboard.component.css'
})


export class MemberDashboardComponent implements OnInit {
  members: any[] = [];
  summary: any = {};
  selectedMember: any = null;
  isLoading = true;

  constructor(
    private memberService: MemberService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.memberService.getSummary().subscribe({
      next: (data) => {
        this.summary = data;
        this.loadMembers();
      },
      error: (err) => {
        console.error('Error loading summary', err);
        this.isLoading = false;
      }
    });
  }

  loadMembers(): void {
    this.memberService.getMembers().subscribe({
      next: (data) => {
        this.members = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading members', err);
        this.isLoading = false;
      }
    });
  }

  showMemberDetails(member: any): void {
    this.selectedMember = member;
  }

  navigateToCreate(): void {
    this.router.navigate(['/members/new']);
  }
}