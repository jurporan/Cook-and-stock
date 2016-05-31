class RegistrationsController < Devise::RegistrationsController
  private

    def after_sign_up_path_for(resource)
      user = User.find_by(email: params[:user][:email])
      user.roles << Role.find_by(name: 'Client')
      dishes_path
    end
end