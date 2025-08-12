import { Component, OnInit } from "@angular/core";
import { Post } from "../post.model";
import { PostService } from "../post.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss']
})


/**
 *  Dashboard Component
 */
export class PostComponent implements OnInit {
  searchTerm: any;
  totalItems: number = 0;
  page: number = 1;
  pageSize: number = 5;
  searchForm: FormGroup;
  post!: Post;
  editForm: FormGroup;
  errorMessage = "";
  errorMessage500 = "";
  actionModal = "";
  isSubmitted = false;
  submitted = false;
  today: string = new Date().toISOString().split('T')[0];

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  posts: Post[] = [];

  constructor(
    private readonly postService: PostService,
    private readonly fb: FormBuilder,
    private readonly modalService: NgbModal,
  ) {
    this.searchForm = this.fb.group({
      id: [''],
      titre: [''],
      statut: [''],
      search: ['']
    });
    this.editForm = this.fb.group({
      id: [''],
      titre: [''],
      slug: [''],
      statut: [''],
    });
  }

  ngOnInit() {
    this.breadCrumbItems = [
      { label: 'Gestion' },
      { label: 'Posts', active: true }
    ];
    this.loadPosts();
  }


  loadPosts() {
    this.postService.getPosts(this.page, this.pageSize, this.searchForm.value).subscribe(
      (response: any) => {
        if (response.status) {
          this.posts = response.data.data || [];
          console.log(this.posts);
          this.totalItems =  response.meta?.count || 0;
        } else {
          this.errorMessage = response.message || 'Une erreur est survenue';
        }
      },
    );
  }

  itemPagination(event: any): void {
    this.pageSize = parseInt(event.target.value, 10);
    this.page = 1;  // ✅ remettre la pagination à la première page
    this.ngOnInit();
  }

  openModal(modalname: any, item: any, action: any) {
    console.log(item);
    if (item !== null) {
      this.post = item
      this.editForm.patchValue(this.post);
    } else {
      this.editForm.reset();
    }
    this.actionModal = action
    this.modalService.open(modalname, { centered: true , size: 'lg' });
  }

  closeModal(_modalname: any) {
    this.modalService.dismissAll();
    this.errorMessage = "";
    this.errorMessage500 = ""
  }


  isSuccessResponse(response: any): boolean {
    return response && typeof response === 'object' && response.status === true;
  }

  deletePost() {
    this.postService.deletePost(this.post.id).subscribe(
      (response: any) => {
        if (this.isSuccessResponse(response)) {
          this.closeModal('ok');
          Swal.fire('Supprimé!', 'cette banque de sanque a été supprimé.', 'success');
          this.loadPosts();
        } else {
          this.errorMessage = response['message'];
          Swal.fire('Erreur!', this.errorMessage || 'Une erreur est survenue.', 'error');
        }
      }
    )
  }

  savePost() {
    if (this.actionModal == "add") {
      // console.log(this.editForm.valid);
      if (this.editForm.valid) {
        this.isSubmitted = true;
        const formData = this.editForm.value;
        // console.log(formData.parent_id);
        this.postService.createPost(formData)
          .subscribe({
            next: (response: any) => {
              console.log('Réponse backend :', response);
              if (!response?.status) {
                this.isSubmitted = false;
                this.errorMessage = response?.message || 'Une erreur est survenue.';
                Swal.fire('Erreur!', this.errorMessage, 'error');
              } else {
                this.closeModal("add");
                this.editForm.reset();
                this.loadPosts();
                this.isSubmitted = false;
                Swal.fire('Ajout réussi !', response.message || 'Ajout réussi.', 'success');
              }
            },
            error: (_error) => {
              this.isSubmitted = false;
              this.errorMessage = _error?.error?.message || 'Erreur réseau ou serveur';
              Swal.fire('Erreur!', this.errorMessage, 'error');
            }
          });
      }
      else {
        this.errorMessage = "Veuillez remplir le formulaire"
      }
    } else {
      this.isSubmitted = true;
      this.postService.updatePost(this.post.id, this.editForm.value)
        .subscribe({
          next: (response: any) => {
            console.log('Réponse backend :', response);
            if (!response?.status) {
              this.isSubmitted = false;
              this.errorMessage = response?.message || 'Une erreur est survenue.';
              Swal.fire('Erreur!', this.errorMessage, 'error');
            } else {
              this.closeModal("add");
              this.editForm.reset();
              this.loadPosts();
              this.isSubmitted = false;
              Swal.fire('Mise à jour réussi !', response.message || 'Mise à jour réussi.', 'success');
            }
          },
          error: (_error) => {
            this.isSubmitted = false;
            this.errorMessage = _error?.error?.message || 'Erreur réseau ou serveur';
            Swal.fire('Erreur!', this.errorMessage, 'error');
          }
        });
    }
  }

  get form() {
    return this.editForm.controls
  }

  action() {
    if (this.actionModal == 'delete') {
      this.deletePost();
    }
  }

}
