import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
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
  isExecutive:boolean=false;

  constructor(
    private memberService: MemberService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.members = this.members.map(member => ({ ...member, showDetails: false }));
    const user = this.authService.getUser();

    if (user) {
      this.isExecutive=user.isExexcutive;
    }
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

  toggleDetails(member: any): void {
  member.showDetails = !member.showDetails;
}
}