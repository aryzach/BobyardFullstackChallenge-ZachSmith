from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Comment

class CommentTestCase(APITestCase):

    def setUp(self):
        # Setup run before every test method.
        Comment.objects.create(text="First comment", author="Author1")
        Comment.objects.create(text="Second comment", author="Author2")

    def test_list_comments(self):
        """
        Ensure we can list all comments.
        """
        url = reverse('comments')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_add_comment(self):
        """
        Ensure we can add a new comment.
        """
        url = reverse('comments')
        data = {'text': 'New comment', 'author': 'Author3'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Comment.objects.count(), 3)
        self.assertEqual(Comment.objects.get(id=3).text, 'New comment')

    def test_edit_comment(self):
        """
        Ensure we can edit an existing comment.
        """
        comment = Comment.objects.get(text="First comment")
        url = reverse('comment_detail', kwargs={'comment_id': comment.id})
        data = {'text': 'Updated comment', 'author': 'Author1'}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Comment.objects.get(id=comment.id).text, 'Updated comment')

    def test_delete_comment(self):
        """
        Ensure we can delete a comment.
        """
        comment = Comment.objects.get(text="Second comment")
        url = reverse('comment_detail', kwargs={'comment_id': comment.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Comment.objects.count(), 1)
